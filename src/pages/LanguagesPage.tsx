import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { usePageNavigation } from '../hooks/usePageNavigation';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { mockLanguages, getLessonsByLanguage, getLanguageById } from '../utils/mockData';
import LanguageService from '../services/languageService';
import { SkillTree } from '../components/SkillTree';
import './LanguagesPage.css';

const LanguagesPage: React.FC = () => {
  const { languageId } = useParams<{ languageId?: string }>();
  const { state, setLanguages, setCurrentLanguage } = useAppContext();
  const { navigate } = usePageNavigation();
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'popular' | 'european' | 'asian' | 'other'>('all');
  const [isGeneratingLesson, setIsGeneratingLesson] = useState(false);

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

  const handleGenerateNewLesson = async (languageCode: string) => {
    setIsGeneratingLesson(true);
    try {
      const newLesson = await LanguageService.generateLesson(
        languageCode,
        'AI Generated Vocabulary',
        'vocabulary'
      );
      console.log('Generated lesson:', newLesson);
      // Here you would typically save the lesson to your state/database
      alert('New lesson generated successfully! Check the console for details.');
    } catch (error) {
      console.error('Error generating lesson:', error);
      alert('Failed to generate lesson. Please try again.');
    } finally {
      setIsGeneratingLesson(false);
    }
  };

  // Language categories for better organization
  const getLanguageCategory = (languageCode: string): string => {
    const popularLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko'];
    const europeanLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'nl', 'sv', 'no', 'da', 'fi', 'pl', 'cs', 'hu', 'ro', 'el', 'ga', 'cy'];
    const asianLanguages = ['zh', 'ja', 'ko', 'hi', 'th', 'vi', 'ar', 'he'];
    
    if (popularLanguages.includes(languageCode)) return 'popular';
    if (europeanLanguages.includes(languageCode)) return 'european';
    if (asianLanguages.includes(languageCode)) return 'asian';
    return 'other';
  };

  const filteredLanguages = state.languages.filter(lang => {
    const matchesDifficulty = filter === 'all' || lang.difficulty === filter;
    const matchesSearch = lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lang.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || getLanguageCategory(lang.code) === categoryFilter;
    
    return matchesDifficulty && matchesSearch && matchesCategory;
  });

  if (languageId && state.currentLanguage) {
    const lessons = getLessonsByLanguage(languageId);

    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #58cc02 0%, #87e300 100%)' }}>
        {/* Back Button */}
        <div style={{ padding: '1rem', position: 'absolute', top: '80px', left: '1rem', zIndex: 10 }}>
          <Button 
            variant="outline" 
            onClick={() => navigate('/languages')}
            style={{ 
              background: 'white', 
              border: '2px solid white',
              color: '#58cc02',
              fontWeight: 'bold'
            }}
          >
            ← Back to Languages
          </Button>
        </div>

        {/* AI Lesson Generator */}
        <div style={{ padding: '1rem', position: 'absolute', top: '80px', right: '1rem', zIndex: 10 }}>
          <Button 
            variant="primary" 
            onClick={() => handleGenerateNewLesson(state.currentLanguage!.code)}
            disabled={isGeneratingLesson}
            style={{
              background: isGeneratingLesson ? '#ccc' : 'white',
              color: '#58cc02',
              border: '2px solid white',
              fontWeight: 'bold'
            }}
          >
            {isGeneratingLesson ? '⏳ Generating...' : '✨ Generate AI Lesson'}
          </Button>
        </div>

        {/* Duolingo-style Skill Tree */}
        <SkillTree 
          lessons={lessons}
          onLessonClick={handleStartLesson}
          language={{
            name: state.currentLanguage.name,
            flag: state.currentLanguage.flag,
            code: state.currentLanguage.code
          }}
        />
      </div>
    );
  }

  return (
    <div className="languages-page">
      <div className="container">
        <h1>🌍 Choose Your Language Adventure</h1>
        <p style={{ marginBottom: '2rem', color: '#666', fontSize: '1.1rem' }}>
          Select from {mockLanguages.length} languages and start your learning journey today!
        </p>
        
        {/* Search and Filters */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: '0.75rem',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          
          {/* Category Filters */}
          <div className="filters" style={{ marginBottom: '1rem' }}>
            <Button 
              variant={categoryFilter === 'all' ? 'primary' : 'outline'}
              onClick={() => setCategoryFilter('all')}
            >
              All Languages
            </Button>
            <Button 
              variant={categoryFilter === 'popular' ? 'primary' : 'outline'}
              onClick={() => setCategoryFilter('popular')}
            >
              🔥 Popular
            </Button>
            <Button 
              variant={categoryFilter === 'european' ? 'primary' : 'outline'}
              onClick={() => setCategoryFilter('european')}
            >
              🇪🇺 European
            </Button>
            <Button 
              variant={categoryFilter === 'asian' ? 'primary' : 'outline'}
              onClick={() => setCategoryFilter('asian')}
            >
              🌏 Asian
            </Button>
            <Button 
              variant={categoryFilter === 'other' ? 'primary' : 'outline'}
              onClick={() => setCategoryFilter('other')}
            >
              🌍 Other
            </Button>
          </div>

          {/* Difficulty Filters */}
          <div className="filters">
            <Button 
              variant={filter === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All Levels
            </Button>
            <Button 
              variant={filter === 'beginner' ? 'primary' : 'outline'}
              onClick={() => setFilter('beginner')}
            >
              🌱 Beginner
            </Button>
            <Button 
              variant={filter === 'intermediate' ? 'primary' : 'outline'}
              onClick={() => setFilter('intermediate')}
            >
              📈 Intermediate
            </Button>
            <Button 
              variant={filter === 'advanced' ? 'primary' : 'outline'}
              onClick={() => setFilter('advanced')}
            >
              🎯 Advanced
            </Button>
          </div>
        </div>

        {/* Results Info */}
        <div style={{ marginBottom: '1rem', color: '#666' }}>
          {filteredLanguages.length === mockLanguages.length 
            ? `Showing all ${filteredLanguages.length} languages`
            : `Showing ${filteredLanguages.length} of ${mockLanguages.length} languages`
          }
        </div>

        {/* Languages Grid */}
        <div className="languages-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem'
        }}>
          {filteredLanguages.map((language) => {
            const category = getLanguageCategory(language.code);
            const categoryEmoji = {
              'popular': '🔥',
              'european': '🇪🇺',
              'asian': '🌏',
              'other': '🌍'
            }[category];

                         return (
               <Card
                 key={language.id}
                 title={`${language.flag} ${language.name}`}
                 subtitle={`${language.totalLessons} lessons • ${language.difficulty}`}
                 onClick={() => handleLanguageSelect(language.id)}
                 hoverable
               >
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{
                    backgroundColor: '#f0f0f0',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {categoryEmoji} {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                </div>
                <p style={{ margin: '0.5rem 0 1rem', lineHeight: '1.4' }}>
                  {language.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.85rem',
                  color: '#666'
                }}>
                  <span>Difficulty: {language.difficulty}</span>
                  <span>→ Start Learning</span>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredLanguages.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#666'
          }}>
            <h3>No languages found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="languages-footer">
          <h3>🚀 Powered by AI & Open APIs</h3>
          <p style={{ margin: '0.5rem 0', color: '#666' }}>
            Our language courses are enhanced with real-world content from free dictionaries and language databases.
            Each course includes vocabulary, grammar, and conversation practice.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#888' }}>
            Built with ❤️ using Free Dictionary API, FreeDict, and community-driven language resources.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguagesPage; 