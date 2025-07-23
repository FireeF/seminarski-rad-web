import { useState, useEffect, useRef, useCallback } from 'react';

// Custom hook za timer funkcionalnost
export function useTimer(initialTime: number = 0, autoStart: boolean = false) {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start timer
  const start = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
  }, []);

  // Pause timer
  const pause = useCallback(() => {
    setIsActive(false);
    setIsPaused(true);
  }, []);

  // Stop timer i reset
  const stop = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setTime(initialTime);
  }, [initialTime]);

  // Resume timer
  const resume = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
  }, []);

  // Reset timer na initial value
  const reset = useCallback(() => {
    setTime(initialTime);
  }, [initialTime]);

  // Set custom time
  const setCustomTime = useCallback((newTime: number) => {
    setTime(newTime);
  }, []);

  // useEffect za timer logiku
  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup funkcija
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused]);

  // Format time za display (MM:SS)
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Format time sa satima (HH:MM:SS)
  const formatTimeWithHours = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Get progress percentage (ako ima maxTime)
  const getProgress = useCallback((maxTime: number): number => {
    if (maxTime <= 0) return 0;
    return Math.min((time / maxTime) * 100, 100);
  }, [time]);

  // Check if timer reached specific time
  const hasReached = useCallback((targetTime: number): boolean => {
    return time >= targetTime;
  }, [time]);

  return {
    // State
    time,
    isActive,
    isPaused,
    isRunning: isActive && !isPaused,
    
    // Controls
    start,
    pause,
    stop,
    resume,
    reset,
    setCustomTime,
    
    // Utilities
    formatTime: formatTime(time),
    formatTimeWithHours: formatTimeWithHours(time),
    getProgress,
    hasReached,
    
    // Raw formatters
    formatTimeRaw: formatTime,
    formatTimeWithHoursRaw: formatTimeWithHours
  };
} 