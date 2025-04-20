'use client';

import { Providers } from './Providers';
import { Navbar } from '../components/Navbar';

import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Providers>
          <Navbar />
          <div className="flex-1 flex justify-center px-4 pt-8 pb-12">
            <div
              className="
              w-full max-w-[380px]
              max-h-[380px]
              bg-white border border-gray-200
              shadow rounded-2xl p-6
            "
            >
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
