import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-between h-[25vh]">
      <div className="flex flex-col items-center space-y-4">
        <span className="text-5xl text-gray-400 font-medium">404</span>
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-gray-600">
          Sorry, we couldn’t find what you’re looking for.
        </p>
      </div>

      <div className="flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center text-purple-600 space-x-1 text-sm"
        >
          <span className="text-lg">←</span>
          <span className="hover:underline">Go back home</span>
        </Link>
      </div>
    </div>
  );
}
