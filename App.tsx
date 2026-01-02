import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NumberProvider, useNumber } from './src/context/NumberContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { QuestionsScreen } from './src/screens/QuestionsScreen';
import { ThinkingScreen } from './src/screens/ThinkingScreen';
import { ResultScreen } from './src/screens/ResultScreen';

const AppContent: React.FC = () => {
  const { currentScreen } = useNumber();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'questions':
        return <QuestionsScreen />;
      case 'thinking':
        return <ThinkingScreen />;
      case 'result':
        return <ResultScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <>
      <StatusBar style="light" />
      {renderScreen()}
    </>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <NumberProvider>
        <AppContent />
      </NumberProvider>
    </LanguageProvider>
  );
}
