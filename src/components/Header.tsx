"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "@/lib/firebase";

interface HeaderProps {
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

const Header = ({ isDarkMode = false, onThemeToggle }: HeaderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    setUser(null);
    setDropdownOpen(false);
  };

  return (
        <header className={`w-full h-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white border-b border-gray-200'} ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center justify-between px-6 shadow-md`}>
      <h1 className="text-xl font-bold">WebBuilder Studio</h1>

      <nav className="flex items-center gap-6 text-sm relative">
        <Link href="/projects" className="hover:underline">
          Projects
        </Link>
        <Link href="/themes" className="hover:underline">
          Themes
        </Link>
                <Link href="/ai-assist" className="hover:underline">
          AI Assist
        </Link>

        {onThemeToggle && (
          <button
            onClick={onThemeToggle}
                        className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors duration-200`}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        )}

        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white"
              title={user.email ?? "Account"}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <span className="text-sm font-bold">U</span>
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md overflow-hidden z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
