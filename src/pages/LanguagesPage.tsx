import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { usePageNavigation } from '../hooks/usePageNavigation';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { mockLanguages, getLessonsByLanguage, getLanguageById } from '../utils/mockData';

const LanguagesPage: React.FC = () => {
  const { languageId } = useParams<{ languageId?: string }>();
  const { state, setLanguages, setCurrentLanguage } = useAppContext();
  const { navigate } = usePageNavigation();
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  useEffect(() => {
    setLanguages(mockLanguages);
    if (languageId) {
      const language = getLanguageById(languageId);
      setCurrentLanguage(language);
    }
  }, [languageId, setLanguages, setCurrentLanguage]);

  const handleLanguageSelect = (langId: string) => {
    navigate(`/languages/${langId}`);
  };

  const handleStartLesson = (lessonId: string) => {
    navigate(`/exercise/${lessonId}`);
  };

  const filteredLanguages = state.languages.filter(lang => 
    filter === 'all' || lang.difficulty === filter
  );

  if (languageId && state.currentLanguage) {
    const lessons = getLessonsByLanguage(languageId);

    return (
      <div className="languages-page">
        <div className="container">
          <div className="language-header">
            <Button variant="outline" onClick={() => navigate('/languages')}>
              ← Back to Languages
            </Button>
            <h1>{state.currentLanguage.flag} {state.currentLanguage.name}</h1>
            <p>{state.currentLanguage.description}</p>
          </div>

          <div className="lessons-grid">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                title={lesson.title}
                subtitle={`${lesson.exercises.length} exercises • ${lesson.category}`}
                onClick={() => handleStartLesson(lesson.id)}
                hoverable
              >
                <p>{lesson.description}</p>
                <div style={{ marginTop: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    backgroundColor: lesson.isCompleted ? '#e8f5e8' : '#f0f0f0',
                    borderRadius: '4px',
                    fontSize: '0.75rem'
                  }}>
                    {lesson.isCompleted ? '✓ Completed' : 'Not Started'}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="languages-page">
      <div className="container">
        <h1>Choose Your Language</h1>
        
        <div className="filters">
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'beginner' ? 'primary' : 'outline'}
            onClick={() => setFilter('beginner')}
          >
            Beginner
          </Button>
          <Button 
            variant={filter === 'intermediate' ? 'primary' : 'outline'}
            onClick={() => setFilter('intermediate')}
          >
            Intermediate
          </Button>
          <Button 
            variant={filter === 'advanced' ? 'primary' : 'outline'}
            onClick={() => setFilter('advanced')}
          >
            Advanced
          </Button>
        </div>

        <div className="languages-grid">
          {filteredLanguages.map((language) => (
            <Card
              key={language.id}
              title={`${language.flag} ${language.name}`}
              subtitle={`${language.totalLessons} lessons • ${language.difficulty}`}
              onClick={() => handleLanguageSelect(language.id)}
              hoverable
            >
              <p>{language.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagesPage; 