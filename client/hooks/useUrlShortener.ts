'use client';

import { useState } from 'react';
import api from '../services/api';

export function useUrlShortener() {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function shorten(target: string) {
    setError(null);
    setLoading(true);
    try {
      const { data } = await api.post('/api/urls', { target });
      const newUrl = `${window.location.origin}/${data.slug}`;
      setShortUrl(newUrl);
      return newUrl;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to shorten URL');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { shortUrl, loading, error, shorten };
}
