'use client';

import { FormEvent, useState } from 'react';
import { useUrlShortener } from '../contexts/useUrlShortener';

export default function HomeForm() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const { shortUrl, loading, error, shorten } = useUrlShortener();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setCopied(false);
    await shorten(url);
  }

  function handleCopy() {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  }

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

      {shortUrl && (
        <>
          <p className="text-green-600">Success! Here’s your short URL:</p>
          <div className="flex items-center space-x-2">
            <a
              href={shortUrl}
              target="_blank"
              className="text-purple-600 underline break-all"
            >
              {shortUrl}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
