'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  if (user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold">Log In</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block mb-1">Your email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full border px-3 py-2 rounded focus:ring"
          />
        </div>
        <div>
          <label className="block mb-1">Your password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Logging in…' : 'Log In'}
        </button>
        <p className="text-sm">
          Don’t have an account?{' '}
          <a href="/account/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </>
  );
}
