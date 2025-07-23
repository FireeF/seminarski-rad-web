import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Language, UserProgress, Exercise, LessonResult } from '../types';

// State interface
interface AppState {
  user: User | null;
  currentLanguage: Language | null;
  userProgress: UserProgress | null;
  currentLesson: Exercise[] | null;
  isLoading: boolean;
  error: string | null;
  languages: Language[];
  streak: number;
}

// Action types
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_CURRENT_LANGUAGE'; payload: Language | null }
  | { type: 'SET_USER_PROGRESS'; payload: UserProgress | null }
  | { type: 'SET_CURRENT_LESSON'; payload: Exercise[] | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LANGUAGES'; payload: Language[] }
  | { type: 'UPDATE_SCORE'; payload: number }
  | { type: 'COMPLETE_LESSON'; payload: LessonResult }
  | { type: 'RESET_STATE' };

// Initial state
const initialState: AppState = {
  user: null,
  currentLanguage: null,
  userProgress: null,
  currentLesson: null,
  isLoading: false,
  error: null,
  languages: [],
  streak: 0
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_CURRENT_LANGUAGE':
      return { ...state, currentLanguage: action.payload };
    
    case 'SET_USER_PROGRESS':
      return { ...state, userProgress: action.payload };
    
    case 'SET_CURRENT_LESSON':
      return { ...state, currentLesson: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_LANGUAGES':
      return { ...state, languages: action.payload };
    
    case 'UPDATE_SCORE':
      if (state.user) {
        const updatedUser = { ...state.user };
        updatedUser.currentScore += action.payload;
        updatedUser.totalScore += action.payload;
        return { ...state, user: updatedUser };
      }
      return state;
    
    case 'COMPLETE_LESSON':
      if (state.user && state.userProgress) {
        const updatedUser = { ...state.user };
        const lessonId = action.payload.lessonId;
        
        // Add lesson to completed lessons
        if (!updatedUser.completedLessons.includes(lessonId)) {
          updatedUser.completedLessons.push(lessonId);
        }
        
        // Update progress
        const updatedProgress = {
          ...state.userProgress,
          score: state.userProgress.score + action.payload.score,
          lastActivity: new Date()
        };
        
        return {
          ...state,
          user: updatedUser,
          userProgress: updatedProgress
        };
      }
      return state;
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

// Context type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Action creators
  setUser: (user: User | null) => void;
  setCurrentLanguage: (language: Language | null) => void;
  setUserProgress: (progress: UserProgress | null) => void;
  setCurrentLesson: (exercises: Exercise[] | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLanguages: (languages: Language[]) => void;
  updateScore: (points: number) => void;
  completeLesson: (result: LessonResult) => void;
  resetState: () => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const setUser = (user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const setCurrentLanguage = (language: Language | null) => {
    dispatch({ type: 'SET_CURRENT_LANGUAGE', payload: language });
  };

  const setUserProgress = (progress: UserProgress | null) => {
    dispatch({ type: 'SET_USER_PROGRESS', payload: progress });
  };

  const setCurrentLesson = (exercises: Exercise[] | null) => {
    dispatch({ type: 'SET_CURRENT_LESSON', payload: exercises });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setLanguages = (languages: Language[]) => {
    dispatch({ type: 'SET_LANGUAGES', payload: languages });
  };

  const updateScore = (points: number) => {
    dispatch({ type: 'UPDATE_SCORE', payload: points });
  };

  const completeLesson = (result: LessonResult) => {
    dispatch({ type: 'COMPLETE_LESSON', payload: result });
  };

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const value: AppContextType = {
    state,
    dispatch,
    setUser,
    setCurrentLanguage,
    setUserProgress,
    setCurrentLesson,
    setLoading,
    setError,
    setLanguages,
    updateScore,
    completeLesson,
    resetState
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 