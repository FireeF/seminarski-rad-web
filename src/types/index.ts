// Osnovni interfejsi za Language Learning aplikaciju

export interface User {
  id: string;
  username: string;
  email: string;
  currentScore: number;
  totalScore: number;
  streak: number;
  joinedDate: Date;
  completedLessons: string[];
  currentLanguage?: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: Date;
  icon?: string;
  points?: number;
  progress?: number;
}

export interface Language {
  id: string;
  name: string;
  code: string; // 'en', 'de', 'fr', 'es'
  flag: string;
  description: string;
  totalLessons: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isActive?: boolean;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[]; // za multiple choice
  correctAnswer: string;
  explanation?: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  languageId: string;
  lessonId: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  languageId: string;
  order: number;
  exercises: Exercise[];
  isCompleted: boolean;
  category: LessonCategory;
}

export interface UserProgress {
  userId: string;
  languageId: string;
  currentLesson: number;
  score: number;
  streak: number;
  completedExercises: string[];
  lastActivity: Date;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  language: string;
  streak: number;
}

export type ExerciseType = 'multiple-choice' | 'translation' | 'fill-in-blank' | 'listening' | 'speaking';

export type LessonCategory = 'vocabulary' | 'grammar' | 'pronunciation' | 'conversation' | 'culture';

export interface ExerciseResult {
  exerciseId: string;
  correct: boolean;
  userAnswer: string;
  correctAnswer: string;
  timeSpent: number; // in seconds
  pointsEarned: number;
}

export interface LessonResult {
  lessonId: string;
  score: number;
  totalScore: number;
  percentage: number;
  exerciseResults: ExerciseResult[];
  completedAt: Date;
} 