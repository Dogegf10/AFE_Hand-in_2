export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Velkommen til Fitness App!</h1>
      <a
        href="/login"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Gå til Login
      </a>
    </div>
  );
}
