import './index.css';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-gray-800">
          🔥 Tailwind v4 is working bro!
        </h1>
        <p className="text-gray-600">
          Ini layout udah full Tailwind, responsive, dan pakai gradient modern. Let's go!
        </p>
        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow hover:scale-105 transition-transform">
          Klik Gue 🔥
        </button>
      </div>
    </div>
  );
}
