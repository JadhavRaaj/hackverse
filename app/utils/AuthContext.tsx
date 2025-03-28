// app/utils/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js'; // Import Session type

interface AuthContextProps {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  setSession: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSession = () => useContext(AuthContext);