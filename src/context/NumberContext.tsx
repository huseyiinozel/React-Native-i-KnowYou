import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NumberContextType {
  secretNumber: string;
  setSecretNumber: (num: string) => void;
  currentScreen: 'welcome' | 'questions' | 'thinking' | 'result';
  setCurrentScreen: (screen: 'welcome' | 'questions' | 'thinking' | 'result') => void;
  resetGame: () => void;
}

const NumberContext = createContext<NumberContextType | undefined>(undefined);

export const NumberProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [secretNumber, setSecretNumber] = useState<string>('');
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'questions' | 'thinking' | 'result'>('welcome');

  const resetGame = () => {
    setSecretNumber('');
    setCurrentScreen('welcome');
  };

  return (
    <NumberContext.Provider value={{ 
      secretNumber, 
      setSecretNumber, 
      currentScreen, 
      setCurrentScreen,
      resetGame 
    }}>
      {children}
    </NumberContext.Provider>
  );
};

export const useNumber = (): NumberContextType => {
  const context = useContext(NumberContext);
  if (!context) {
    throw new Error('useNumber must be used within a NumberProvider');
  }
  return context;
};
