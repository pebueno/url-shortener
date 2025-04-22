export const metadata = { title: 'URL Shortener' };

export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
