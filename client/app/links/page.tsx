'use client';
import { useState, useEffect } from 'react';
import { useVisitsUrls } from '../../hooks/useVisitsUrls';
import { UrlItem } from '../../components/common/types';
import Link from 'next/link';

export default function LinksPage() {
  const { urls, loading, error, updateSlug } = useVisitsUrls();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftSlug, setDraftSlug] = useState('');
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  // Whenever we enter edit mode, seed the draftSlug from the current URL
  useEffect(() => {
    if (editingId !== null) {
      const current = urls.find((u) => u.id === editingId);
      if (current) setDraftSlug(current.slug);
    }
  }, [editingId, urls]);

  const handleStartEdit = (id: string) => {
    setEditingId(id);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!editingId) return;

    const curr = urls.find((u) => u.id === editingId);
    if (!curr) return;

    // only save if it actually changed & is 6+ chars
    if (draftSlug !== curr.slug && draftSlug.length >= 6) {
      await updateSlug(curr.slug, draftSlug);
    }
    setEditingId(null);
  };

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (urls.length === 0) {
    return (
      <div className="text-center space-y-4">
        <p className="text-gray-600">You haven't shortened any URLs yet.</p>
        <Link
          href="/"
          className="inline-flex items-center text-purple-600 space-x-1 text-sm"
        >
          <span className="text-lg">←</span>
          <span className="hover:underline">Create your first short link</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Shortened Links</h2>
      <table className="w-full table-fixed">
        <colgroup>
          <col className="w-2/5" />
          <col className="w-2/5" />
          <col className="w-1/12" />
          <col className="w-2/12" />
        </colgroup>
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Original URL</th>
            <th className="text-left py-2">Short URL</th>
            <th className="text-center py-2">Visits</th>
            <th className="text-center py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((u: UrlItem) => (
            <tr key={u.id} className="border-b">
              {/*Original URL */}
              <td className="py-2 break-all">{u.target}</td>

              {/* Short URL (full domain + slug) */}
              <td className="py-2 break-all">
                {editingId === u.id ? (
                  <input
                    value={draftSlug}
                    onChange={(e) => setDraftSlug(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                ) : (
                  <a
                    href={`${origin}/${u.slug}`}
                    target="_blank"
                    className="text-purple-600 hover:underline"
                  >
                    {origin}/{u.slug}
                  </a>
                )}
              </td>

              <td className="text-center py-2">{u.visits}</td>

              {/* 4) Action buttons */}
              <td className="text-center py-2 space-x-2">
                {editingId === u.id ? (
                  <div className="flex justify-end items-center space-x-4">
                    <button
                      onClick={handleCancel}
                      className="text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={draftSlug === u.slug || draftSlug.length < 6}
                      className="text-green-600 hover:underline"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartEdit(u.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
