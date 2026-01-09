import { createContext, useContext, useState, ReactNode } from 'react';
import { Decision, DecisionStage } from '@/types/decision';
import { mockDecisions, getDecisionById } from '@/data/decisions';

interface DecisionContextType {
  decisions: Decision[];
  currentDecision: Decision | null;
  setCurrentDecision: (decision: Decision | null) => void;
  updateDecisionStage: (id: string, stage: DecisionStage) => void;
  getDecision: (id: string) => Decision | undefined;
  pendingCount: number;
  executingCount: number;
  deferredCount: number;
  completedCount: number;
}

const DecisionContext = createContext<DecisionContextType | undefined>(undefined);

export function DecisionProvider({ children }: { children: ReactNode }) {
  const [decisions, setDecisions] = useState<Decision[]>(mockDecisions);
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);

  const updateDecisionStage = (id: string, stage: DecisionStage) => {
    setDecisions(prev => 
      prev.map(d => d.id === id ? { ...d, stage } : d)
    );
  };

  const getDecision = (id: string) => {
    return decisions.find(d => d.id === id) || getDecisionById(id);
  };

  const pendingCount = decisions.filter(d => d.stage === 'pending').length;
  const executingCount = decisions.filter(d => d.stage === 'executing').length;
  const deferredCount = decisions.filter(d => d.stage === 'deferred').length;
  const completedCount = decisions.filter(d => d.stage === 'completed').length;

  return (
    <DecisionContext.Provider value={{
      decisions,
      currentDecision,
      setCurrentDecision,
      updateDecisionStage,
      getDecision,
      pendingCount,
      executingCount,
      deferredCount,
      completedCount
    }}>
      {children}
    </DecisionContext.Provider>
  );
}

export function useDecisions() {
  const context = useContext(DecisionContext);
  if (!context) {
    throw new Error('useDecisions must be used within DecisionProvider');
  }
  return context;
}
