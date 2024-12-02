import { Video } from "./ui/video";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video baggrund */}
      <Video />

      {/* Logo i øverste højre hjørne */}
      <div className="absolute top-4 right-4">
        <img
         src="/img/pig.png"
         alt="Logo"
         className="h-32 w-auto"
        />
      </div>
      
      {/* Overlay med tekst og knap */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-15 dark:bg-opacity-20">
        <h1 className="text-4xl font-bold text-blue-50 mb-6 text-center">
          Welcome to Pig to Brick Fitness!
        </h1>
        <a
          href="/login"
          className="bg-blue-500 text-white px-6 py-3 rounded text-lg transition-all duration-200 ease-in-out hover:bg-blue-600 active:bg-blue-700 transform active:scale-95"

        >
          Login
        </a>
      </div>
    </div>

  );
}
