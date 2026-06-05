import { createContext, useState, useContext, ReactNode, useMemo } from 'react';

interface LoadingContextType {
  isInitialLoad: boolean;
  finishInitialLoad: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Check if loader has already been shown this session
const hasLoadedBefore = () => sessionStorage.getItem('hasLoaded') === 'true';

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(() => !hasLoadedBefore());

  const finishInitialLoad = () => {
    sessionStorage.setItem('hasLoaded', 'true');
    setIsInitialLoad(false);
  };

  const value = useMemo(() => ({ isInitialLoad, finishInitialLoad }), [isInitialLoad]);

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};