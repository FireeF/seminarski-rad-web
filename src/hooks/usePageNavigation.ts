import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Custom hook za page navigation sa dodatnim funkcionalnostima
export function usePageNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  // Praćenje promene rute
  useEffect(() => {
    setIsNavigating(false);
  }, [location.pathname]);

  // Funkcija za navigaciju sa loading indikatorom
  const navigateWithLoading = (path: string, replace: boolean = false) => {
    setIsNavigating(true);
    navigate(path, { replace });
  };

  // Funkcija za go back
  const goBack = () => {
    setIsNavigating(true);
    navigate(-1);
  };

  // Funkcija za go forward
  const goForward = () => {
    setIsNavigating(true);
    navigate(1);
  };

  // Provera da li je trenutna ruta aktivna
  const isCurrentRoute = (path: string): boolean => {
    return location.pathname === path;
  };

  // Get query parametri
  const getQueryParam = (param: string): string | null => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };

  // Set query parametri
  const setQueryParam = (param: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(param, value);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  // Remove query parametar
  const removeQueryParam = (param: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(param);
    const queryString = searchParams.toString();
    const newPath = queryString ? `${location.pathname}?${queryString}` : location.pathname;
    navigate(newPath, { replace: true });
  };

  // Get current path segments
  const getPathSegments = (): string[] => {
    return location.pathname.split('/').filter(segment => segment !== '');
  };

  // Check if path matches pattern
  const matchesPattern = (pattern: string): boolean => {
    const regex = new RegExp(pattern.replace(/:\w+/g, '\\w+'));
    return regex.test(location.pathname);
  };

  return {
    // Basic navigation
    navigate: navigateWithLoading,
    goBack,
    goForward,
    
    // Current location info
    currentPath: location.pathname,
    currentSearch: location.search,
    currentHash: location.hash,
    isNavigating,
    
    // Route utilities
    isCurrentRoute,
    matchesPattern,
    getPathSegments,
    
    // Query parameters
    getQueryParam,
    setQueryParam,
    removeQueryParam,
    
    // Original hooks (za direktan pristup ako je potreban)
    location,
    originalNavigate: navigate
  };
} 