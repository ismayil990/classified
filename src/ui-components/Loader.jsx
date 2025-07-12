export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative">
        {/* Main grid with dramatic animations */}
        <div className="grid grid-cols-2 gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg animate-dramatic-pulse shadow-sm"></div>
          <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg animate-dramatic-pulse shadow-sm" style={{animationDelay: '0.5s'}}></div>
          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg animate-dramatic-pulse shadow-sm" style={{animationDelay: '1s'}}></div>
          <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg animate-dramatic-pulse shadow-sm" style={{animationDelay: '1.5s'}}></div>
        </div>

        {/* Animated pulsing dot */}
        <div className="absolute -top-3 -right-3 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse shadow-lg">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-ping opacity-75"></div>
        </div>

        {/* Enhanced progress bar */}
        <div className="absolute -bottom-5 left-0 w-full">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full animate-progress relative shadow-lg"
              style={{
                width: '75%',
                animation: 'progress 3s ease-in-out infinite'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-slide"></div>
            </div>
          </div>
        </div>

        {/* Animated SVG icon */}
        <div className="absolute top-1 left-1 w-3 h-3 text-indigo-600 animate-spin">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Floating particles */}
        <div className="absolute -top-4 -left-4 w-2 h-2 bg-indigo-300 rounded-full animate-bounce opacity-80"></div>
        <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-80" style={{animationDelay: '1s'}}></div>
        <div className="absolute -top-2 right-6 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-80" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Loading text */}
      <div className="mt-8 text-center">
        <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
          Yüklənir...
        </span>
        <div className="mt-2 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
        </div>
      </div>
    </div>
  );
}