import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

export function Navbar() {
  const { user, logout } = useAuth();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-zinc-300 shadow px-6 py-2 flex justify-between">
      <Link href="/">
        <span className="text-xl font-bold cursor-pointer">URL Shortener</span>
      </Link>

      <div>
        {mounted &&
          (user ? (
            <button
              onClick={logout}
              className="text-gray-700 hover:text-gray-900 cursor-pointer bg-none p-0"
            >
              Logout
            </button>
          ) : (
            <Link href="/account/login">
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer">
                Login
              </span>
            </Link>
          ))}
      </div>
    </nav>
  );
}
