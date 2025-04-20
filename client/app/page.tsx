'use client';

import Head from 'next/head';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import HomeForm from '../components/HomeForm';
import { useEffect } from 'react';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace('/account/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <>
      <Head>
        <title>URL Shortener</title>
      </Head>
      <HomeForm />
    </>
  );
}
