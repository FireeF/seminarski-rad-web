import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { usePageNavigation } from '../hooks/usePageNavigation';
import { useTimer } from '../hooks/useTimer';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { ExerciseManager } from '../models/ExerciseManager';
import { getLessonsByLanguage, getExercisesByLanguage } from '../utils/mockData';

const ExercisePage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { state, updateScore } = useAppContext();
  const { navigate } = usePageNavigation();
  const timer = useTimer(0, true);
  
  const [exerciseManager, setExerciseManager] = useState<ExerciseManager | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  
  // Session storage for temporary exercise progress
  const [sessionProgress, setSessionProgress] = useSessionStorage(
    `exercise-progress-${lessonId}`,
    {
      currentIndex: 0,
      answers: [] as string[],
      timeSpent: 0,
      startedAt: Date.now()
    }
  );

  useEffect(() => {
    if (lessonId) {
      // Find lesson and create exercise manager
      const allLessons = getLessonsByLanguage('en').concat(
        getLessonsByLanguage('de'),
        getLessonsByLanguage('fr'),
        getLessonsByLanguage('es')
      );
      
      const lesson = allLessons.find(l => l.id === lessonId);
      if (lesson) {
        const exercises = getExercisesByLanguage(lesson.languageId).filter(ex => ex.lessonId === lessonId);
        const manager = new ExerciseManager(exercises);
        
        // Restore progress from session storage
        if (sessionProgress.currentIndex > 0 && sessionProgress.currentIndex < exercises.length) {
          for (let i = 0; i < sessionProgress.currentIndex; i++) {
            manager.nextExercise();
          }
        }
        
        setExerciseManager(manager);
      }
    }
  }, [lessonId]);

  const handleSubmitAnswer = useCallback(() => {
    if (!exerciseManager || !userAnswer.trim()) return;

    const result = exerciseManager.submitAnswer(userAnswer);
    setLastResult(result);
    setShowResult(true);
    
    if (result.correct) {
      updateScore(result.pointsEarned);
    }
    
    // Update session progress
    setSessionProgress(prev => ({
      ...prev,
      answers: [...prev.answers, userAnswer],
      currentIndex: exerciseManager.getCurrentExerciseIndex(),
      timeSpent: timer.time
    }));
  }, [exerciseManager, userAnswer, updateScore, setSessionProgress, timer.time]);

  const handleNextExercise = useCallback(() => {
    if (!exerciseManager) return;
    
    const hasNext = exerciseManager.nextExercise();
    setUserAnswer('');
    setShowResult(false);
    setLastResult(null);
    
    if (!hasNext) {
      // Lesson completed
      const lessonResult = exerciseManager.generateLessonResult(lessonId!);
      navigate('/profile');
    }
  }, [exerciseManager, lessonId, navigate]);

  const handleAnswerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  }, []);

  const currentExercise = useMemo(() => 
    exerciseManager?.getCurrentExercise(), 
    [exerciseManager, showResult]
  );

  const exerciseProgress = useMemo(() => 
    exerciseManager?.getProgress() || 0, 
    [exerciseManager, showResult]
  );

  const currentExerciseIndex = useMemo(() => 
    (exerciseManager as any)?.currentExerciseIndex + 1 || 1, 
    [exerciseManager, showResult]
  );

  if (!currentExercise) {
    return (
      <div className="exercise-page">
        <div className="container">
          <Card title="Exercise Not Found">
            <p>The requested exercise could not be found.</p>
            <Button onClick={() => navigate('/languages')}>
              Back to Languages
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="exercise-page">
      <div className="container">
        <div className="exercise-header">
          <div className="progress-info">
            <div>Progress: {exerciseProgress}%</div>
            <div>Time: {timer.formatTime}</div>
            <div>Points: {currentExercise.points}</div>
          </div>
        </div>

        <Card title={`Exercise ${currentExerciseIndex}`}>
          <div className="exercise-content">
            <h3>{currentExercise.question}</h3>
            
            {currentExercise.type === 'multiple-choice' && currentExercise.options && (
              <div className="options">
                {currentExercise.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswer === option ? 'primary' : 'outline'}
                    onClick={() => setUserAnswer(option)}
                    fullWidth
                                         className="option-button"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {(currentExercise.type === 'translation' || currentExercise.type === 'fill-in-blank') && (
              <input
                type="text"
                value={userAnswer}
                onChange={handleAnswerChange}
                placeholder="Enter your answer..."
                className="answer-input"
                autoFocus
                key={`input-${currentExerciseIndex}`}
              />
            )}

            {showResult && lastResult && (
              <div className={`result ${lastResult.correct ? 'correct' : 'incorrect'}`} style={{
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: lastResult.correct ? '#e8f5e8' : '#fce8e6',
                color: lastResult.correct ? '#34a853' : '#ea4335',
                marginBottom: '1rem'
              }}>
                <p>{lastResult.correct ? '✓ Correct!' : '✗ Incorrect'}</p>
                <p>Correct answer: {lastResult.correctAnswer}</p>
                {currentExercise.explanation && <p>{currentExercise.explanation}</p>}
                <p>Points earned: {lastResult.pointsEarned}</p>
              </div>
            )}

            <div className="exercise-actions">
              {!showResult ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim()}
                  variant="primary"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextExercise} variant="primary">
                  {exerciseManager?.isCompleted() ? 'Complete Lesson' : 'Next Exercise'}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExercisePage; 