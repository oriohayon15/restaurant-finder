// pages/index.js

import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Local Restaurant Finder</h1>
      <Link href="/signup" className="text-blue-500 underline">
      Go to Signup Page
      </Link>

    </div>
  );
}
