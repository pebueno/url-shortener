import { ReactNode } from 'react'

import '../../styles/globals.css';

export default function LinksLayout({ children }: { children: ReactNode }) {
  return (
      <div className="bg-gray-50">
        <div className="min-h-screen">
          <div className="flex justify-center p-8">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow">
              {children}
            </div>
          </div>
        </div>
      </div>
  )
}
