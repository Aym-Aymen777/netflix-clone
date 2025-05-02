import React from "react";

const NotFound = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center text-center">
      {/* Clapperboard Section */}
      <div className="bg-gray-800 border-4 border-gray-600 p-6 rounded-xl mb-8 shadow-xl animate-pulse">
        <h1 className="text-4xl text-red-500">🎬 Scene Not Found</h1>
        <p className="text-xl text-gray-300">SCENE: 404</p>
        <p className="text-xl text-gray-300">TAKE: 1</p>
        <p className="text-xl text-gray-300">STATUS: LOST</p>
      </div>

      {/* Message Section */}
      <div className="text-lg max-w-xl mb-12 px-4">
        Looks like this scene didn’t make the final cut. <br />
        The page you’re looking for doesn’t exist or has been taken off the script.
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="/"
          className="bg-gray-900 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          🎟️ Back to Home Theater
        </a>
        <a
          href="/search"
          className="bg-gray-900 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          🔍 Search for a Movie
        </a>
        <a
          href="/"
          className="bg-gray-900 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          🍿 Browse Popular Films
        </a>
      </div>
    </div>
  );
};

export default NotFound;
