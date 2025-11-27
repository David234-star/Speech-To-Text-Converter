// components/Header.tsx
import Link from 'next/link';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { useAppStore } from '@/store/appStore'; // Import the store

const Header = () => {
  const { isAuthenticated, user, logout } = useAppStore(); // Get state and actions

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg shadow-lg">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* ... Logo ... */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-orbitron text-white">
          <FaMicrophoneAlt className="text-neon-cyan drop-shadow-[0_0_5px_#00f5d4]" />
          <span>Echo</span><span className="text-neon-cyan">Scribe</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 font-semibold">
          <Link href="/" className="hover:text-neon-cyan transition-colors">Home</Link>
          {isAuthenticated && <Link href="/history" className="hover:text-neon-cyan transition-colors">History</Link>}
        </div>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">Welcome, {user?.username}</span>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-md text-sm font-semibold bg-white/10 hover:bg-neon-magenta transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/signin" className="px-4 py-2 rounded-md text-sm font-semibold hover:bg-white/20 transition-colors">
                Sign In
              </Link>
              <Link href="/auth/signup" className="px-4 py-2 rounded-md text-sm font-semibold bg-neon-cyan text-black hover:shadow-glow-cyan transition-shadow">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;