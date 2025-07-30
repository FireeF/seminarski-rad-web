import { Language, Exercise, Lesson } from '../types';

// API endpoints for language data
const DICTIONARY_API_BASE = 'https://api.dictionaryapi.dev/api/v2/entries';
const FREEDICT_API_BASE = 'https://freedict.org/freedict-database.json';

export interface WordDefinition {
  word: string;
  phonetic?: string;
  phonetics?: Array<{
    text?: string;
    audio?: string;
  }>;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
      synonyms?: string[];
      antonyms?: string[];
    }>;
  }>;
}

export interface Translation {
  sourceWord: string;
  targetWord: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence?: number;
}

export class LanguageService {
  // Cache for API responses to avoid excessive requests
  private static cache = new Map<string, any>();
  
  // Get word definition from Free Dictionary API
  static async getWordDefinition(word: string, language: string = 'en'): Promise<WordDefinition | null> {
    const cacheKey = `definition_${language}_${word}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${DICTIONARY_API_BASE}/${language}/${word}`);
      
      if (!response.ok) {
        return null;
      }
      
      const data = await response.json();
      const definition = data[0]; // Take first definition
      
      this.cache.set(cacheKey, definition);
      return definition;
    } catch (error) {
      console.error(`Error fetching definition for ${word}:`, error);
      return null;
    }
  }

  // Generate vocabulary exercises from word definitions
  static async generateVocabularyExercises(
    words: string[], 
    sourceLanguage: string, 
    targetLanguage: string = 'en'
  ): Promise<Exercise[]> {
    const exercises: Exercise[] = [];
    
    for (const word of words.slice(0, 10)) { // Limit to 10 words to avoid API limits
      try {
        const definition = await this.getWordDefinition(word, targetLanguage);
        
        if (definition && definition.meanings.length > 0) {
          // Create multiple choice exercise
          const meaning = definition.meanings[0];
          const mainDefinition = meaning.definitions[0];
          
          exercises.push({
            id: `vocab_${word}_${Date.now()}`,
            type: 'multiple-choice',
            question: `What does "${word}" mean?`,
            options: [
              mainDefinition.definition,
              'A completely different meaning',
              'Another wrong option',
              'Yet another incorrect choice'
            ],
            correctAnswer: mainDefinition.definition,
            explanation: mainDefinition.example || `"${word}" means: ${mainDefinition.definition}`,
            points: 10,
            difficulty: 'easy',
            languageId: sourceLanguage,
            lessonId: `${sourceLanguage}_vocab_lesson`
          });

          // Create translation exercise if we have synonyms
          if (mainDefinition.synonyms && mainDefinition.synonyms.length > 0) {
            exercises.push({
              id: `synonym_${word}_${Date.now()}`,
              type: 'translation',
              question: `What is a synonym for "${word}"?`,
              correctAnswer: mainDefinition.synonyms[0],
              explanation: `"${mainDefinition.synonyms[0]}" is a synonym for "${word}"`,
              points: 15,
              difficulty: 'medium',
              languageId: sourceLanguage,
              lessonId: `${sourceLanguage}_vocab_lesson`
            });
          }
        }
      } catch (error) {
        console.error(`Error creating exercise for word ${word}:`, error);
      }
    }
    
    return exercises;
  }

  // Get common words for a language (mock implementation)
  static getCommonWords(languageCode: string): string[] {
    const commonWords: { [key: string]: string[] } = {
      'en': ['hello', 'goodbye', 'please', 'thank', 'water', 'food', 'house', 'family', 'friend', 'love'],
      'es': ['hola', 'adiós', 'por favor', 'gracias', 'agua', 'comida', 'casa', 'familia', 'amigo', 'amor'],
      'fr': ['bonjour', 'au revoir', 's\'il vous plaît', 'merci', 'eau', 'nourriture', 'maison', 'famille', 'ami', 'amour'],
      'de': ['hallo', 'auf wiedersehen', 'bitte', 'danke', 'wasser', 'essen', 'haus', 'familie', 'freund', 'liebe'],
      'it': ['ciao', 'arrivederci', 'per favore', 'grazie', 'acqua', 'cibo', 'casa', 'famiglia', 'amico', 'amore'],
      'pt': ['olá', 'tchau', 'por favor', 'obrigado', 'água', 'comida', 'casa', 'família', 'amigo', 'amor'],
      'ru': ['привет', 'до свидания', 'пожалуйста', 'спасибо', 'вода', 'еда', 'дом', 'семья', 'друг', 'любовь'],
      'zh': ['你好', '再见', '请', '谢谢', '水', '食物', '房子', '家庭', '朋友', '爱'],
      'ja': ['こんにちは', 'さようなら', 'お願いします', 'ありがとう', '水', '食べ物', '家', '家族', '友達', '愛'],
      'ko': ['안녕하세요', '안녕히 가세요', '제발', '감사합니다', '물', '음식', '집', '가족', '친구', '사랑'],
      'ar': ['مرحبا', 'وداعا', 'من فضلك', 'شكرا', 'ماء', 'طعام', 'بيت', 'عائلة', 'صديق', 'حب'],
      'hi': ['नमस्ते', 'अलविदा', 'कृपया', 'धन्यवाद', 'पानी', 'भोजन', 'घर', 'परिवार', 'मित्र', 'प्रेम']
    };
    
    return commonWords[languageCode] || commonWords['en'];
  }

  // Generate a complete lesson with exercises
  static async generateLesson(
    languageCode: string, 
    lessonTitle: string, 
    category: string
  ): Promise<Lesson> {
    const commonWords = this.getCommonWords(languageCode);
    const exercises = await this.generateVocabularyExercises(commonWords, languageCode);
    
    return {
      id: `${languageCode}_${category}_${Date.now()}`,
      title: lessonTitle,
      description: `Learn essential ${category} vocabulary and expressions`,
      languageId: languageCode,
      order: 1,
      exercises: exercises,
      isCompleted: false,
      category: category as any
    };
  }

  // Get available language pairs from FreeDict (simplified)
  static async getAvailableLanguagePairs(): Promise<Array<{from: string, to: string}>> {
    // Mock implementation - in a real app, you'd fetch from FreeDict API
    return [
      { from: 'en', to: 'es' },
      { from: 'en', to: 'fr' },
      { from: 'en', to: 'de' },
      { from: 'es', to: 'en' },
      { from: 'fr', to: 'en' },
      { from: 'de', to: 'en' }
    ];
  }

  // Simulate translation using a simple mock
  static async translateWord(
    word: string, 
    fromLang: string, 
    toLang: string
  ): Promise<string | null> {
    // Mock translations - in a real app, you'd use a translation API
    const translations: { [key: string]: { [key: string]: string } } = {
      'en_es': {
        'hello': 'hola',
        'goodbye': 'adiós',
        'please': 'por favor',
        'thank you': 'gracias',
        'water': 'agua',
        'food': 'comida'
      },
      'es_en': {
        'hola': 'hello',
        'adiós': 'goodbye',
        'por favor': 'please',
        'gracias': 'thank you',
        'agua': 'water',
        'comida': 'food'
      }
    };
    
    const key = `${fromLang}_${toLang}`;
    return translations[key]?.[word.toLowerCase()] || null;
  }

  // Create diverse exercise types
  static createTranslationExercise(
    sourceWord: string,
    targetWord: string,
    sourceLang: string,
    targetLang: string,
    lessonId: string
  ): Exercise {
    return {
      id: `trans_${sourceWord}_${Date.now()}`,
      type: 'translation',
      question: `Translate "${sourceWord}" to ${targetLang.toUpperCase()}`,
      correctAnswer: targetWord,
      explanation: `"${sourceWord}" in ${sourceLang.toUpperCase()} means "${targetWord}" in ${targetLang.toUpperCase()}`,
      points: 15,
      difficulty: 'medium',
      languageId: sourceLang,
      lessonId: lessonId
    };
  }

  static createFillInBlankExercise(
    sentence: string,
    missingWord: string,
    languageId: string,
    lessonId: string
  ): Exercise {
    const sentenceWithBlank = sentence.replace(missingWord, '____');
    
    return {
      id: `fill_${missingWord}_${Date.now()}`,
      type: 'fill-in-blank',
      question: `Complete the sentence: "${sentenceWithBlank}"`,
      correctAnswer: missingWord,
      explanation: `The missing word is "${missingWord}"`,
      points: 12,
      difficulty: 'medium',
      languageId: languageId,
      lessonId: lessonId
    };
  }
}

export default LanguageService; 