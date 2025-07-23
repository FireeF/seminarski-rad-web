import { useState, useEffect } from 'react';

// Custom hook za localStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State za čuvanje vrednosti
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Pokušaj da učita iz localStorage
      const item = window.localStorage.getItem(key);
      // Parsira JSON ili vraća initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Funkcija za postavljanje vrednosti
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Omogućava da value bude funkcija tako da imamo isti API kao useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Čuva u state
      setStoredValue(valueToStore);
      
      // Čuva u localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // useEffect za sinhronizaciju sa localStorage changes iz drugih tab-ova
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage change for key "${key}":`, error);
        }
      }
    };

    // Listen za storage eventi (promena iz drugih tab-ova)
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue] as const;
} 