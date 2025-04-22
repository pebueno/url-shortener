import { useState, useEffect } from 'react';
import api from '../services/api';
import { UrlItem } from '../components/common/types';

export function useVisitsUrls() {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  async function fetchUrls() {
    api
      .get<UrlItem[]>('/api/urls')
      .then((res) => setUrls(res.data))
      .catch((err) => setError(err.message || 'Failed to load URLs'))
      .finally(() => setLoading(false));
  }

  const updateSlug = async (oldSlug: string, newSlug: string) => {
    await api.patch(`/api/urls/${oldSlug}`, { slug: newSlug });
    const res = await api.get<UrlItem[]>('/api/urls');
    setUrls(res.data);
  };

  useEffect(() => {
    fetchUrls();
    // every 10s, re‑fetch to pick up new visits
    const id = setInterval(fetchUrls, 10000);
    return () => clearInterval(id);
  }, []);

  return { urls, loading, error, updateSlug };
}
