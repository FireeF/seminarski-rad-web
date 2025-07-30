import { Language, Exercise, Lesson, LeaderboardEntry } from '../types';

// Expanded Mock Languages Data with more languages inspired by Duolingo
export const mockLanguages: Language[] = [
  // Popular European Languages
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
    id: 'es',
    name: 'Spanish',
    code: 'es',
    flag: '🇪🇸',
    description: 'Learn Spanish - spoken by 500+ million people worldwide.',
    totalLessons: 52,
    difficulty: 'beginner'
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
    id: 'de',
    name: 'German',
    code: 'de',
    flag: '🇩🇪',
    description: 'Master German - spoken by over 100 million people in Europe.',
    totalLessons: 45,
    difficulty: 'intermediate'
  },
  {
    id: 'it',
    name: 'Italian',
    code: 'it',
    flag: '🇮🇹',
    description: 'Learn Italian - the language of art, culture, and cuisine.',
    totalLessons: 42,
    difficulty: 'intermediate'
  },
  {
    id: 'pt',
    name: 'Portuguese',
    code: 'pt',
    flag: '🇵🇹',
    description: 'Learn Portuguese - spoken in Brazil, Portugal, and across Africa.',
    totalLessons: 40,
    difficulty: 'intermediate'
  },
  {
    id: 'ru',
    name: 'Russian',
    code: 'ru',
    flag: '🇷🇺',
    description: 'Master Russian - the most widely spoken Slavic language.',
    totalLessons: 55,
    difficulty: 'advanced'
  },
  {
    id: 'nl',
    name: 'Dutch',
    code: 'nl',
    flag: '🇳🇱',
    description: 'Learn Dutch - spoken in the Netherlands and Belgium.',
    totalLessons: 38,
    difficulty: 'intermediate'
  },

  // Asian Languages
  {
    id: 'zh',
    name: 'Chinese',
    code: 'zh',
    flag: '🇨🇳',
    description: 'Learn Mandarin Chinese - spoken by over 1 billion people.',
    totalLessons: 60,
    difficulty: 'advanced'
  },
  {
    id: 'ja',
    name: 'Japanese',
    code: 'ja',
    flag: '🇯🇵',
    description: 'Master Japanese - the language of technology and tradition.',
    totalLessons: 65,
    difficulty: 'advanced'
  },
  {
    id: 'ko',
    name: 'Korean',
    code: 'ko',
    flag: '🇰🇷',
    description: 'Learn Korean - increasingly popular worldwide thanks to K-pop and K-dramas.',
    totalLessons: 50,
    difficulty: 'advanced'
  },
  {
    id: 'hi',
    name: 'Hindi',
    code: 'hi',
    flag: '🇮🇳',
    description: 'Learn Hindi - one of the most spoken languages in the world.',
    totalLessons: 45,
    difficulty: 'intermediate'
  },
  {
    id: 'th',
    name: 'Thai',
    code: 'th',
    flag: '🇹🇭',
    description: 'Learn Thai - the beautiful tonal language of Thailand.',
    totalLessons: 40,
    difficulty: 'advanced'
  },
  {
    id: 'vi',
    name: 'Vietnamese',
    code: 'vi',
    flag: '🇻🇳',
    description: 'Learn Vietnamese - spoken by over 90 million people.',
    totalLessons: 42,
    difficulty: 'advanced'
  },

  // Middle Eastern and African Languages
  {
    id: 'ar',
    name: 'Arabic',
    code: 'ar',
    flag: '🇸🇦',
    description: 'Learn Arabic - the liturgical language of Islam and spoken across the Middle East.',
    totalLessons: 58,
    difficulty: 'advanced'
  },
  {
    id: 'he',
    name: 'Hebrew',
    code: 'he',
    flag: '🇮🇱',
    description: 'Learn Hebrew - the ancient language revived as modern Hebrew.',
    totalLessons: 45,
    difficulty: 'advanced'
  },
  {
    id: 'tr',
    name: 'Turkish',
    code: 'tr',
    flag: '🇹🇷',
    description: 'Learn Turkish - the bridge between Europe and Asia.',
    totalLessons: 43,
    difficulty: 'intermediate'
  },
  {
    id: 'sw',
    name: 'Swahili',
    code: 'sw',
    flag: '🇰🇪',
    description: 'Learn Swahili - widely spoken across East Africa.',
    totalLessons: 35,
    difficulty: 'beginner'
  },

  // Nordic Languages
  {
    id: 'sv',
    name: 'Swedish',
    code: 'sv',
    flag: '🇸🇪',
    description: 'Learn Swedish - the melodic North Germanic language.',
    totalLessons: 40,
    difficulty: 'intermediate'
  },
  {
    id: 'no',
    name: 'Norwegian',
    code: 'no',
    flag: '🇳🇴',
    description: 'Learn Norwegian - closely related to Danish and Swedish.',
    totalLessons: 38,
    difficulty: 'intermediate'
  },
  {
    id: 'da',
    name: 'Danish',
    code: 'da',
    flag: '🇩🇰',
    description: 'Learn Danish - the language of Vikings and modern Scandinavia.',
    totalLessons: 37,
    difficulty: 'intermediate'
  },
  {
    id: 'fi',
    name: 'Finnish',
    code: 'fi',
    flag: '🇫🇮',
    description: 'Learn Finnish - unique among European languages.',
    totalLessons: 50,
    difficulty: 'advanced'
  },

  // Other European Languages
  {
    id: 'pl',
    name: 'Polish',
    code: 'pl',
    flag: '🇵🇱',
    description: 'Learn Polish - the largest West Slavic language.',
    totalLessons: 48,
    difficulty: 'advanced'
  },
  {
    id: 'cs',
    name: 'Czech',
    code: 'cs',
    flag: '🇨🇿',
    description: 'Learn Czech - the beautiful language of Central Europe.',
    totalLessons: 44,
    difficulty: 'advanced'
  },
  {
    id: 'hu',
    name: 'Hungarian',
    code: 'hu',
    flag: '🇭🇺',
    description: 'Learn Hungarian - a unique Finno-Ugric language.',
    totalLessons: 50,
    difficulty: 'advanced'
  },
  {
    id: 'ro',
    name: 'Romanian',
    code: 'ro',
    flag: '🇷🇴',
    description: 'Learn Romanian - the Romance language of Eastern Europe.',
    totalLessons: 42,
    difficulty: 'intermediate'
  },
  {
    id: 'el',
    name: 'Greek',
    code: 'el',
    flag: '🇬🇷',
    description: 'Learn Greek - the foundation of Western civilization.',
    totalLessons: 46,
    difficulty: 'advanced'
  },

  // Constructed Languages (Fun additions)
  {
    id: 'eo',
    name: 'Esperanto',
    code: 'eo',
    flag: '🌍',
    description: 'Learn Esperanto - the international auxiliary language.',
    totalLessons: 30,
    difficulty: 'beginner'
  },

  // Celtic Languages
  {
    id: 'ga',
    name: 'Irish',
    code: 'ga',
    flag: '🇮🇪',
    description: 'Learn Irish Gaelic - the Celtic language of Ireland.',
    totalLessons: 35,
    difficulty: 'intermediate'
  },
  {
    id: 'cy',
    name: 'Welsh',
    code: 'cy',
    flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    description: 'Learn Welsh - the Celtic language of Wales.',
    totalLessons: 36,
    difficulty: 'intermediate'
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

// Mock Lessons - Enhanced with better organization
export const mockLessons: Lesson[] = [
  // English Basics
  {
    id: 'en-lesson-1',
    title: 'Basic Greetings',
    description: 'Learn essential English greetings and introductions',
    languageId: 'en',
    order: 1,
    exercises: mockEnglishExercises.filter(ex => ex.lessonId === 'en-lesson-1'),
    isCompleted: true, // Mark some as completed for demo
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
  
  // German Basics
  {
    id: 'de-lesson-1',
    title: 'Deutsche Grüße',
    description: 'Basic German greetings and polite expressions',
    languageId: 'de',
    order: 1,
    exercises: mockGermanExercises.filter(ex => ex.lessonId === 'de-lesson-1'),
    isCompleted: true,
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
    id: 'de-lesson-3',
    title: 'Die Familie',
    description: 'Family members and relationships',
    languageId: 'de',
    order: 3,
    exercises: [],
    isCompleted: false,
    category: 'vocabulary'
  },
  {
    id: 'de-lesson-4',
    title: 'Deutsche Artikel',
    description: 'Learn German articles (der, die, das)',
    languageId: 'de',
    order: 4,
    exercises: [],
    isCompleted: false,
    category: 'grammar'
  },
  
  // French Basics
  {
    id: 'fr-lesson-1',
    title: 'Salutations Françaises',
    description: 'Essential French greetings and courtesy',
    languageId: 'fr',
    order: 1,
    exercises: mockFrenchExercises.filter(ex => ex.lessonId === 'fr-lesson-1'),
    isCompleted: true,
    category: 'vocabulary'
  },
  {
    id: 'fr-lesson-2',
    title: 'Se présenter',
    description: 'Introduce yourself in French',
    languageId: 'fr',
    order: 2,
    exercises: [],
    isCompleted: false,
    category: 'conversation'
  },
  {
    id: 'fr-lesson-3',
    title: 'Les nombres',
    description: 'Numbers from 1 to 100',
    languageId: 'fr',
    order: 3,
    exercises: [],
    isCompleted: false,
    category: 'vocabulary'
  },
  {
    id: 'fr-lesson-4',
    title: 'Pronunciation Basics',
    description: 'French pronunciation fundamentals',
    languageId: 'fr',
    order: 4,
    exercises: [],
    isCompleted: false,
    category: 'pronunciation'
  },
  
  // Spanish Basics
  {
    id: 'es-lesson-1',
    title: 'Saludos Españoles',
    description: 'Basic Spanish greetings and farewells',
    languageId: 'es',
    order: 1,
    exercises: mockSpanishExercises.filter(ex => ex.lessonId === 'es-lesson-1'),
    isCompleted: true,
    category: 'vocabulary'
  },
  {
    id: 'es-lesson-2',
    title: 'La familia',
    description: 'Family members in Spanish',
    languageId: 'es',
    order: 2,
    exercises: [],
    isCompleted: false,
    category: 'vocabulary'
  },
  {
    id: 'es-lesson-3',
    title: 'Conversación básica',
    description: 'Basic Spanish conversation',
    languageId: 'es',
    order: 3,
    exercises: [],
    isCompleted: false,
    category: 'conversation'
  },
  {
    id: 'es-lesson-4',
    title: 'Presente de indicativo',
    description: 'Present tense conjugations',
    languageId: 'es',
    order: 4,
    exercises: [],
    isCompleted: false,
    category: 'grammar'
  },
  {
    id: 'es-lesson-5',
    title: 'Cultura Hispana',
    description: 'Hispanic culture and traditions',
    languageId: 'es',
    order: 5,
    exercises: [],
    isCompleted: false,
    category: 'culture'
  },

  // Japanese Basics
  {
    id: 'ja-lesson-1',
    title: 'Hiragana Basics',
    description: 'Learn the Hiragana alphabet',
    languageId: 'ja',
    order: 1,
    exercises: [],
    isCompleted: false,
    category: 'vocabulary'
  },
  {
    id: 'ja-lesson-2',
    title: 'Japanese Greetings',
    description: 'Essential Japanese greetings',
    languageId: 'ja',
    order: 2,
    exercises: [],
    isCompleted: false,
    category: 'conversation'
  },
  {
    id: 'ja-lesson-3',
    title: 'Polite Forms',
    description: 'Japanese politeness levels',
    languageId: 'ja',
    order: 3,
    exercises: [],
    isCompleted: false,
    category: 'grammar'
  },

  // Chinese Basics
  {
    id: 'zh-lesson-1',
    title: 'Pinyin Basics',
    description: 'Learn Chinese pronunciation with Pinyin',
    languageId: 'zh',
    order: 1,
    exercises: [],
    isCompleted: false,
    category: 'pronunciation'
  },
  {
    id: 'zh-lesson-2',
    title: 'Chinese Numbers',
    description: 'Numbers 1-10 in Chinese',
    languageId: 'zh',
    order: 2,
    exercises: [],
    isCompleted: false,
    category: 'vocabulary'
  },

  // Italian Basics
  {
    id: 'it-lesson-1',
    title: 'Ciao Italia!',
    description: 'Basic Italian greetings',
    languageId: 'it',
    order: 1,
    exercises: [],
    isCompleted: false,
    category: 'vocabulary'
  },
  {
    id: 'it-lesson-2',
    title: 'La famiglia italiana',
    description: 'Italian family vocabulary',
    languageId: 'it',
    order: 2,
    exercises: [],
    isCompleted: false,
    category: 'vocabulary'
  },

  // Portuguese Basics
  {
    id: 'pt-lesson-1',
    title: 'Olá Portugal!',
    description: 'Portuguese greetings and basic phrases',
    languageId: 'pt',
    order: 1,
    exercises: [],
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