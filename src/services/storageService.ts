export class StorageService {
  // Keys for different storage items
  private static readonly KEYS = {
    APP_STATE: 'appState',
    USER_PREFIX: 'user_',
    EXERCISE_PROGRESS_PREFIX: 'exercise-progress-',
    LANGUAGE_PREFERENCE: 'language-preference',
    THEME_PREFERENCE: 'theme-preference'
  };

  // LocalStorage methods
  static setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // SessionStorage methods
  static setSessionItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  }

  static getSessionItem<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return null;
    }
  }

  static removeSessionItem(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
    }
  }

  static clearSession(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  }

  // App-specific methods
  static saveAppState(state: any): void {
    this.setItem(this.KEYS.APP_STATE, state);
  }

  static getAppState(): any {
    return this.getItem(this.KEYS.APP_STATE);
  }

  static saveUser(userId: string, userData: any): void {
    this.setItem(`${this.KEYS.USER_PREFIX}${userId}`, userData);
  }

  static getUser(userId: string): any {
    return this.getItem(`${this.KEYS.USER_PREFIX}${userId}`);
  }

  static saveExerciseProgress(lessonId: string, progress: any): void {
    this.setSessionItem(`${this.KEYS.EXERCISE_PROGRESS_PREFIX}${lessonId}`, progress);
  }

  static getExerciseProgress(lessonId: string): any {
    return this.getSessionItem(`${this.KEYS.EXERCISE_PROGRESS_PREFIX}${lessonId}`);
  }

  static clearExerciseProgress(lessonId: string): void {
    this.removeSessionItem(`${this.KEYS.EXERCISE_PROGRESS_PREFIX}${lessonId}`);
  }

  // Utility methods
  static isStorageAvailable(type: 'localStorage' | 'sessionStorage' = 'localStorage'): boolean {
    try {
      const storage = window[type];
      const testKey = '__storage_test__';
      storage.setItem(testKey, 'test');
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  static getStorageSize(type: 'localStorage' | 'sessionStorage' = 'localStorage'): number {
    let totalSize = 0;
    const storage = window[type];
    
    for (const key in storage) {
      if (storage.hasOwnProperty(key)) {
        totalSize += storage[key].length + key.length;
      }
    }
    
    return totalSize;
  }

  static exportData(): object {
    const data: any = {};
    
    // Export all localStorage data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        data[key] = this.getItem(key);
      }
    }
    
    return data;
  }

  static importData(data: object): void {
    Object.entries(data).forEach(([key, value]) => {
      this.setItem(key, value);
    });
  }
}

export default StorageService;