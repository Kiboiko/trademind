import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type TradeSide = 'buy' | 'sell';

export type TradeRecord = {
  id: number;
  side: TradeSide;
  amount: number;
  profit: number;
  at: number;
};

type GameContextValue = {
  balance: number;
  xp: number;
  missionProgress: number;
  tradesCount: number;
  hasProfitableTrade: boolean;
  history: TradeRecord[];
  executeTrade: (amount: number, side: TradeSide) => number;
  resetGame: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

const INITIAL_BALANCE = 1000;
const INITIAL_XP = 120;

export function GameProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [xp, setXp] = useState(INITIAL_XP);
  const [missionProgress, setMissionProgress] = useState(0);
  const [tradesCount, setTradesCount] = useState(0);
  const [hasProfitableTrade, setHasProfitableTrade] = useState(false);
  const [history, setHistory] = useState<TradeRecord[]>([]);
  const executeTrade = useCallback((amount: number, side: TradeSide) => {
    const alignedWithAi = side === 'buy';
    const winRate = alignedWithAi ? 0.78 : 0.28;
    const won = Math.random() < winRate;
    const profit = won ? amount * 0.86 : -amount * 0.35;

    setBalance((b) => Math.max(0, b + profit));
    setTradesCount((c) => c + 1);
    setHistory((h) => [
      {
        id: Date.now(),
        side,
        amount,
        profit,
        at: Date.now(),
      },
      ...h.slice(0, 9),
    ]);

    if (won) {
      setHasProfitableTrade(true);
      setXp((x) => x + 50);
      setMissionProgress((p) => Math.min(100, p + 34));
    } else {
      setMissionProgress((p) => Math.min(100, p + 8));
    }

    return profit;
  }, []);

  const resetGame = useCallback(() => {
    setBalance(INITIAL_BALANCE);
    setXp(INITIAL_XP);
    setMissionProgress(0);
    setTradesCount(0);
    setHasProfitableTrade(false);
    setHistory([]);
  }, []);

  const value = useMemo(
    () => ({
      balance,
      xp,
      missionProgress,
      tradesCount,
      hasProfitableTrade,
      history,
      executeTrade,
      resetGame,
    }),
    [
      balance,
      xp,
      missionProgress,
      tradesCount,
      hasProfitableTrade,
      history,
      executeTrade,
      resetGame,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
