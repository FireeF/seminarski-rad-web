import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { usePageNavigation } from '../hooks/usePageNavigation';
import { useTimer } from '../hooks/useTimer';
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
        setExerciseManager(new ExerciseManager(exercises));
      }
    }
  }, [lessonId]);

  const handleSubmitAnswer = () => {
    if (!exerciseManager || !userAnswer.trim()) return;

    const result = exerciseManager.submitAnswer(userAnswer);
    setLastResult(result);
    setShowResult(true);
    
    if (result.correct) {
      updateScore(result.pointsEarned);
    }
  };

  const handleNextExercise = () => {
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
  };

  const currentExercise = exerciseManager?.getCurrentExercise();

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
            <div>Progress: {exerciseManager?.getProgress()}%</div>
            <div>Time: {timer.formatTime}</div>
            <div>Points: {currentExercise.points}</div>
          </div>
        </div>

                 <Card title={`Exercise ${(exerciseManager as any)?.currentExerciseIndex + 1 || 1}`}>
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
                                 onChange={(e) => setUserAnswer(e.target.value)}
                 placeholder="Enter your answer..."
                 className="answer-input"
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