'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import { AuthContextType } from '../components/common/types';
import { useRouter } from 'next/navigation';
import api from '../services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() =>
    typeof window === 'undefined' ? null : sessionStorage.getItem('user'),
  );
  const router = useRouter();

  async function signup(email: string, password: string) {
    await api.post('/api/auth/signup', { email, password });
    router.push('/account/login');
  }

  async function login(email: string, password: string) {
    const { data } = await api.post('/api/auth/login', { email, password });
    sessionStorage.setItem('token', data.access_token);
    sessionStorage.setItem('user', email);
    setUser(email);
    router.push('/'); // take them home on success
  }

  function logout() {
    sessionStorage.clear();
    setUser(null);
    router.push('/account/login');
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
