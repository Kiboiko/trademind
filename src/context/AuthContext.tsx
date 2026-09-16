import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type AuthContextValue = {
  isRegistered: boolean;
  name: string;
  avatar: string | null;
  register: (fullName: string) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState('Guest');
  const [isRegistered, setIsRegistered] = useState(false);

  const register = (fullName: string) => {
    const firstName = fullName.trim().split(' ')[0];
    setName(firstName || 'Trader');
    setIsRegistered(true);
  };

  const value = useMemo(
    () => ({
      isRegistered,
      name,
      avatar: isRegistered ? 'https://randomuser.me/api/portraits/men/32.jpg' : null,
      register,
    }),
    [isRegistered, name],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
