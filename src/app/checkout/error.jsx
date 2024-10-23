'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-red-500 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="bg-black text-white px-4 py-2 rounded hover:bg-opacity-90"
      >
        Try again
      </button>
    </div>
  );
}