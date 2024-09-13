export default function ProductLogo() {
  return (
    <section className="flex justify-between items-center mb-8">
      <div className="text-2xl font-bold">
        RIMMEL
        <span className="text-sm font-normal block">LONDON</span>
      </div>
      <button className="p-2 bg-gray-50 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </section>
  );
}

