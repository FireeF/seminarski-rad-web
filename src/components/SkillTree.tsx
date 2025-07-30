import React from 'react';
import { Lesson } from '../types';
import './SkillTree.css';

interface SkillTreeProps {
  lessons: Lesson[];
  onLessonClick: (lessonId: string) => void;
  language: {
    name: string;
    flag: string;
    code: string;
  };
}

interface SkillUnit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  color: string;
  icon: string;
}

export const SkillTree: React.FC<SkillTreeProps> = ({ lessons, onLessonClick, language }) => {
  // Organize lessons into skill units like Duolingo
  const createSkillUnits = (): SkillUnit[] => {
    const units: SkillUnit[] = [
      {
        id: 'unit1',
        title: 'Basics',
        description: 'Get started with the fundamentals',
        lessons: lessons.filter(lesson => lesson.category === 'vocabulary' || lesson.title.toLowerCase().includes('basic')),
        color: '#58cc02',
        icon: '👋'
      },
      {
        id: 'unit2', 
        title: 'Phrases',
        description: 'Common phrases and expressions',
        lessons: lessons.filter(lesson => lesson.category === 'conversation' || lesson.title.toLowerCase().includes('phrase')),
        color: '#00cd9c',
        icon: '💬'
      },
      {
        id: 'unit3',
        title: 'Grammar',
        description: 'Master the grammar rules',
        lessons: lessons.filter(lesson => lesson.category === 'grammar'),
        color: '#ce82ff',
        icon: '📚'
      },
      {
        id: 'unit4',
        title: 'Pronunciation',
        description: 'Perfect your pronunciation',
        lessons: lessons.filter(lesson => lesson.category === 'pronunciation'),
        color: '#ff9600',
        icon: '🗣️'
      },
      {
        id: 'unit5',
        title: 'Culture',
        description: 'Learn about the culture',
        lessons: lessons.filter(lesson => lesson.category === 'culture'),
        color: '#ff4b4b',
        icon: '🌍'
      }
    ].filter(unit => unit.lessons.length > 0);

    return units;
  };

  const skillUnits = createSkillUnits();

  const getSkillProgress = (unit: SkillUnit): number => {
    const completedLessons = unit.lessons.filter(lesson => lesson.isCompleted).length;
    return unit.lessons.length > 0 ? (completedLessons / unit.lessons.length) * 100 : 0;
  };

  const getSkillStatus = (unit: SkillUnit): 'locked' | 'available' | 'started' | 'completed' => {
    const progress = getSkillProgress(unit);
    if (progress === 100) return 'completed';
    if (progress > 0) return 'started';
    return 'available';
  };

  const LessonBubble: React.FC<{ lesson: Lesson; unitColor: string }> = ({ lesson, unitColor }) => {
    const lessonStatus = lesson.isCompleted ? 'completed' : 'available';
    
    return (
      <div 
        className={`lesson-bubble lesson-bubble--${lessonStatus}`}
        onClick={() => onLessonClick(lesson.id)}
        style={{ '--unit-color': unitColor } as React.CSSProperties}
      >
        <div className="lesson-bubble__icon">
          {lesson.isCompleted ? '✓' : lesson.order}
        </div>
        <div className="lesson-bubble__title">{lesson.title}</div>
      </div>
    );
  };

  return (
    <div className="skill-tree">
      <div className="skill-tree__header">
        <h1 className="skill-tree__title">
          {language.flag} {language.name} Course
        </h1>
        <p className="skill-tree__subtitle">
          Complete skills to unlock new content
        </p>
      </div>

      <div className="skill-tree__content">
        {skillUnits.map((unit, unitIndex) => {
          const progress = getSkillProgress(unit);
          const status = getSkillStatus(unit);
          
          return (
            <div key={unit.id} className="skill-unit">
              <div className="skill-unit__header">
                <div 
                  className={`skill-unit__icon skill-unit__icon--${status}`}
                  style={{ backgroundColor: unit.color }}
                >
                  <span>{unit.icon}</span>
                </div>
                <div className="skill-unit__info">
                  <h3 className="skill-unit__title">{unit.title}</h3>
                  <p className="skill-unit__description">{unit.description}</p>
                  <div className="skill-unit__progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-bar__fill"
                        style={{ 
                          width: `${progress}%`,
                          backgroundColor: unit.color
                        }}
                      />
                    </div>
                    <span className="progress-text">
                      {Math.round(progress)}% complete
                    </span>
                  </div>
                </div>
              </div>

              <div className="skill-unit__lessons">
                {unit.lessons.map((lesson) => (
                  <LessonBubble 
                    key={lesson.id} 
                    lesson={lesson} 
                    unitColor={unit.color}
                  />
                ))}
              </div>

              {/* Connecting line to next unit */}
              {unitIndex < skillUnits.length - 1 && (
                <div className="skill-unit__connector" />
              )}
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="skill-tree__stats">
        <div className="stat-card">
          <div className="stat-card__number">{lessons.length}</div>
          <div className="stat-card__label">Total Lessons</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__number">
            {lessons.filter(l => l.isCompleted).length}
          </div>
          <div className="stat-card__label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__number">{skillUnits.length}</div>
          <div className="stat-card__label">Skills</div>
        </div>
      </div>
    </div>
  );
}; 