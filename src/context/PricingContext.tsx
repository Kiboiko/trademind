import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type PlanId = 'starter' | 'pro' | 'premium' | null;

type PricingContextValue = {
  selectedPlan: PlanId;
  setSelectedPlan: (plan: PlanId) => void;
};

const PricingContext = createContext<PricingContextValue | null>(null);

export function PricingProvider({ children }: { children: ReactNode }) {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(null);

  const value = useMemo(
    () => ({ selectedPlan, setSelectedPlan }),
    [selectedPlan],
  );

  return (
    <PricingContext.Provider value={value}>{children}</PricingContext.Provider>
  );
}

export function usePricing() {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error('usePricing must be used within PricingProvider');
  return ctx;
}
