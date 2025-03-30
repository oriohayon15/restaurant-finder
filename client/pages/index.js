// pages/index.js

import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Local Restaurant Finder</h1>
      <Link href="/signup" className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer" >
      Signup
      </Link>
      <br></br>
      <br></br>
      <Link href="/login" className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer" >
      Log In
      </Link>

    </div>
  );
}
