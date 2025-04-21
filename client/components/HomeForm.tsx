'use client';

import { FormEvent, useState } from 'react';
import { useUrlShortener } from '../hooks/useUrlShortener';
import Link from 'next/link';
import { Button } from './Button';

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between h-[25vh]"
    >
      <div className="flex flex-col space-y-6">
        <label className="block font-medium">Enter the URL to shorten</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder="https://example.com"
          pattern="https?://.+"
          title="Please include http:// or https://"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
        />

        <Button type="submit" loading={loading} loadingText="Shortening…">
          Shorten
        </Button>

        {shortUrl && (
          <>
            <p className="text-green-600">Success! Here’s your short URL:</p>
            <div className="flex items-center space-x-2 justify-between">
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
      </div>

      <div className="mt-4 text-sm text-gray-600 order-last">
        Want to manage all your links?{' '}
        <Link href="/links" className="text-purple-600 hover:underline">
          View &amp; Edit Links
        </Link>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
