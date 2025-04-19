import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>URL Shortener Client</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h1 className="text-4xl font-extrabold mb-2">Client app</h1>
        <p className="text-gray-600">Welcome to the URL Shortener frontend!</p>
      </div>
    </>
  )
}
