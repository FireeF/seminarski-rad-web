import { Language, Exercise, Lesson, LeaderboardEntry } from '../types';

// Mock Languages Data
export const mockLanguages: Language[] = [
  {
    id: 'en',
    name: 'English',
    code: 'en',
    flag: '🇺🇸',
    description: 'Learn English - the global language of communication, business, and the internet.',
    totalLessons: 50,
    difficulty: 'beginner'
  },
  {
    id: 'de',
    name: 'German',
    code: 'de',
    flag: '🇩🇪',
    description: 'Master German - spoken by over 100 million people in Europe.',
    totalLessons: 45,
    difficulty: 'intermediate'
  },
  {
    id: 'fr',
    name: 'French',
    code: 'fr',
    flag: '🇫🇷',
    description: 'Discover French - the language of love, culture, and diplomacy.',
    totalLessons: 48,
    difficulty: 'intermediate'
  },
  {
    id: 'es',
    name: 'Spanish',
    code: 'es',
    flag: '🇪🇸',
    description: 'Learn Spanish - spoken by 500+ million people worldwide.',
    totalLessons: 52,
    difficulty: 'beginner'
  }
];

// Mock English Exercises
export const mockEnglishExercises: Exercise[] = [
  // Multiple Choice Exercises
  {
    id: 'en-mc-1',
    type: 'multiple-choice',
    question: 'What is the correct translation of "Hello" in English?',
    options: ['Hello', 'Goodbye', 'Please', 'Thank you'],
    correctAnswer: 'Hello',
    explanation: 'Hello is the standard greeting in English.',
    points: 10,
    difficulty: 'easy',
    languageId: 'en',
    lessonId: 'en-lesson-1'
  },
  {
    id: 'en-mc-2',
    type: 'multiple-choice',
    question: 'Which word means "house"?',
    options: ['Car', 'House', 'Tree', 'Book'],
    correctAnswer: 'House',
    explanation: 'House is a building where people live.',
    points: 10,
    difficulty: 'easy',
    languageId: 'en',
    lessonId: 'en-lesson-1'
  },
  
  // Translation Exercises
  {
    id: 'en-tr-1',
    type: 'translation',
    question: 'Translate to English: "Dobar dan"',
    correctAnswer: 'Good day',
    explanation: 'Good day is a formal greeting.',
    points: 15,
    difficulty: 'medium',
    languageId: 'en',
    lessonId: 'en-lesson-2'
  },
  {
    id: 'en-tr-2',
    type: 'translation',
    question: 'Translate to English: "Kako se zoveš?"',
    correctAnswer: 'What is your name?',
    explanation: 'This is asking for someone\'s name.',
    points: 15,
    difficulty: 'medium',
    languageId: 'en',
    lessonId: 'en-lesson-2'
  },
  
  // Fill in the blank
  {
    id: 'en-fb-1',
    type: 'fill-in-blank',
    question: 'Complete the sentence: "I _____ a student."',
    correctAnswer: 'am',
    explanation: 'Use "am" with "I" in present tense.',
    points: 12,
    difficulty: 'easy',
    languageId: 'en',
    lessonId: 'en-lesson-3'
  }
];

// Mock German Exercises
export const mockGermanExercises: Exercise[] = [
  {
    id: 'de-mc-1',
    type: 'multiple-choice',
    question: 'What is "Hello" in German?',
    options: ['Hallo', 'Tschüss', 'Bitte', 'Danke'],
    correctAnswer: 'Hallo',
    explanation: 'Hallo is the casual way to say hello in German.',
    points: 10,
    difficulty: 'easy',
    languageId: 'de',
    lessonId: 'de-lesson-1'
  },
  {
    id: 'de-tr-1',
    type: 'translation',
    question: 'Translate to German: "Good morning"',
    correctAnswer: 'Guten Morgen',
    explanation: 'Guten Morgen is the formal morning greeting.',
    points: 15,
    difficulty: 'medium',
    languageId: 'de',
    lessonId: 'de-lesson-1'
  },
  {
    id: 'de-fb-1',
    type: 'fill-in-blank',
    question: 'Complete: "Ich _____ Hans." (I am Hans)',
    correctAnswer: 'bin',
    explanation: 'Use "bin" with "ich" (I) in German.',
    points: 12,
    difficulty: 'medium',
    languageId: 'de',
    lessonId: 'de-lesson-2'
  }
];

// Mock French Exercises
export const mockFrenchExercises: Exercise[] = [
  {
    id: 'fr-mc-1',
    type: 'multiple-choice',
    question: 'What is "Thank you" in French?',
    options: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît'],
    correctAnswer: 'Merci',
    explanation: 'Merci means thank you in French.',
    points: 10,
    difficulty: 'easy',
    languageId: 'fr',
    lessonId: 'fr-lesson-1'
  },
  {
    id: 'fr-tr-1',
    type: 'translation',
    question: 'Translate to French: "Good evening"',
    correctAnswer: 'Bonsoir',
    explanation: 'Bonsoir is used for evening greetings.',
    points: 15,
    difficulty: 'medium',
    languageId: 'fr',
    lessonId: 'fr-lesson-1'
  }
];

// Mock Spanish Exercises
export const mockSpanishExercises: Exercise[] = [
  {
    id: 'es-mc-1',
    type: 'multiple-choice',
    question: 'What is "Goodbye" in Spanish?',
    options: ['Hola', 'Adiós', 'Por favor', 'Gracias'],
    correctAnswer: 'Adiós',
    explanation: 'Adiós means goodbye in Spanish.',
    points: 10,
    difficulty: 'easy',
    languageId: 'es',
    lessonId: 'es-lesson-1'
  },
  {
    id: 'es-tr-1',
    type: 'translation',
    question: 'Translate to Spanish: "How are you?"',
    correctAnswer: '¿Cómo estás?',
    explanation: 'This is the informal way to ask how someone is.',
    points: 15,
    difficulty: 'medium',
    languageId: 'es',
    lessonId: 'es-lesson-1'
  }
];

// Mock Lessons
export const mockLessons: Lesson[] = [
  {
    id: 'en-lesson-1',
    title: 'Basic Greetings',
    description: 'Learn essential English greetings and introductions',
    languageId: 'en',
    order: 1,
    exercises: mockEnglishExercises.filter(ex => ex.lessonId === 'en-lesson-1'),
    isCompleted: false,
    category: 'vocabulary'
  },
  {
    id: 'en-lesson-2',
    title: 'Common Questions',
    description: 'Master everyday questions in English',
    languageId: 'en',
    order: 2,
    exercises: mockEnglishExercises.filter(ex => ex.lessonId === 'en-lesson-2'),
    isCompleted: false,
    category: 'conversation'
  },
  {
    id: 'en-lesson-3',
    title: 'Present Tense',
    description: 'Learn present tense verbs and sentence structure',
    languageId: 'en',
    order: 3,
    exercises: mockEnglishExercises.filter(ex => ex.lessonId === 'en-lesson-3'),
    isCompleted: false,
    category: 'grammar'
  },
  {
    id: 'de-lesson-1',
    title: 'Deutsche Grüße',
    description: 'Basic German greetings and polite expressions',
    languageId: 'de',
    order: 1,
    exercises: mockGermanExercises.filter(ex => ex.lessonId === 'de-lesson-1'),
    isCompleted: false,
    category: 'vocabulary'
  },
  {
    id: 'de-lesson-2',
    title: 'Sich vorstellen',
    description: 'Introducing yourself in German',
    languageId: 'de',
    order: 2,
    exercises: mockGermanExercises.filter(ex => ex.lessonId === 'de-lesson-2'),
    isCompleted: false,
    category: 'conversation'
  },
  {
    id: 'fr-lesson-1',
    title: 'Salutations Françaises',
    description: 'Essential French greetings and courtesy',
    languageId: 'fr',
    order: 1,
    exercises: mockFrenchExercises.filter(ex => ex.lessonId === 'fr-lesson-1'),
    isCompleted: false,
    category: 'vocabulary'
  },
  {
    id: 'es-lesson-1',
    title: 'Saludos Españoles',
    description: 'Basic Spanish greetings and farewells',
    languageId: 'es',
    order: 1,
    exercises: mockSpanishExercises.filter(ex => ex.lessonId === 'es-lesson-1'),
    isCompleted: false,
    category: 'vocabulary'
  }
];

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    username: 'PolyglotPro',
    score: 15420,
    language: 'English',
    streak: 45
  },
  {
    rank: 2,
    username: 'LinguaLover',
    score: 12890,
    language: 'German',
    streak: 23
  },
  {
    rank: 3,
    username: 'FrenchFanatic',
    score: 11750,
    language: 'French',
    streak: 31
  },
  {
    rank: 4,
    username: 'SpanishStar',
    score: 10340,
    language: 'Spanish',
    streak: 18
  },
  {
    rank: 5,
    username: 'WordWizard',
    score: 9890,
    language: 'English',
    streak: 12
  },
  {
    rank: 6,
    username: 'GermanGuru',
    score: 8760,
    language: 'German',
    streak: 27
  },
  {
    rank: 7,
    username: 'LanguageLearner',
    score: 7650,
    language: 'French',
    streak: 15
  },
  {
    rank: 8,
    username: 'StudyBuddy',
    score: 6540,
    language: 'Spanish',
    streak: 9
  }
];

// Utility functions for getting exercises by language
export const getExercisesByLanguage = (languageId: string): Exercise[] => {
  switch (languageId) {
    case 'en':
      return mockEnglishExercises;
    case 'de':
      return mockGermanExercises;
    case 'fr':
      return mockFrenchExercises;
    case 'es':
      return mockSpanishExercises;
    default:
      return [];
  }
};

export const getLessonsByLanguage = (languageId: string): Lesson[] => {
  return mockLessons.filter(lesson => lesson.languageId === languageId);
};

export const getLanguageById = (languageId: string): Language | null => {
  return mockLanguages.find(lang => lang.id === languageId) || null;
}; 