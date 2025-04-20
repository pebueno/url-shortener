'use client';

import { FormEvent, useState } from 'react';
import { useUrlShortener } from '../contexts/useUrlShortener';

export default function HomeForm() {
  const [url, setUrl] = useState('');
  const { shortUrl, loading, error, shorten } = useUrlShortener();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await shorten(url);
    } catch {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block font-medium">Enter the URL to shorten</label>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:bg-purple-300"
      >
        {loading ? 'Shortening…' : 'Shorten'}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {shortUrl && (
        <div className="mt-4 p-4 bg-green-50 rounded">
          <p className="text-green-700">Success! Your short URL:</p>
          <a href={shortUrl} className="text-purple-600 underline break-all">
            {shortUrl}
          </a>
        </div>
      )}
    </form>
  );
}
