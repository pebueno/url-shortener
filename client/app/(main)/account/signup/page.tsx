'use client';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../contexts/AuthContext';
import { Button } from '../../../../components/Button';

export default function SignupPage() {
  const { signup, user } = useAuth();
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
      await signup(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text‑2xl font-semibold">Create your account</h2>
        {error && <p className="text‑red‑500">{error}</p>}
        <div>
          <label className="block mb-1">Your email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring"
            placeholder="you@example.com"
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
            placeholder="••••••••"
          />
        </div>
        <Button type="submit" loading={loading} loadingText="Signing up…">
          Sign Up
        </Button>
        <p className="text-sm">
          Already have an account?{' '}
          <a href="/account/login" className="text-blue‑600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </>
  );
}
