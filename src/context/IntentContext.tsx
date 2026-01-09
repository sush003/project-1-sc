import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { IntentType, IntentConfig, getIntent, INTENTS } from '@/types/intent';

interface IntentContextType {
  currentIntent: IntentConfig;
  setIntent: (intentId: IntentType) => void;
  allIntents: IntentConfig[];
  intentJustChanged: boolean;
  clearIntentChange: () => void;
}

const IntentContext = createContext<IntentContextType | undefined>(undefined);

export function IntentProvider({ children }: { children: ReactNode }) {
  const [intentId, setIntentId] = useState<IntentType>('margin_protection');
  const [intentJustChanged, setIntentJustChanged] = useState(false);

  const setIntent = useCallback((newIntentId: IntentType) => {
    if (newIntentId !== intentId) {
      setIntentId(newIntentId);
      setIntentJustChanged(true);
      // Auto-clear after 5 seconds
      setTimeout(() => setIntentJustChanged(false), 5000);
    }
  }, [intentId]);

  const clearIntentChange = useCallback(() => {
    setIntentJustChanged(false);
  }, []);

  const value: IntentContextType = {
    currentIntent: getIntent(intentId),
    setIntent,
    allIntents: Object.values(INTENTS),
    intentJustChanged,
    clearIntentChange
  };

  return (
    <IntentContext.Provider value={value}>
      {children}
    </IntentContext.Provider>
  );
}

export function useIntent() {
  const context = useContext(IntentContext);
  if (context === undefined) {
    throw new Error('useIntent must be used within an IntentProvider');
  }
  return context;
}
