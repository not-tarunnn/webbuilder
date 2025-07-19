"use client";

import React from "react";
import Link from "next/link";

const Header = () => (
  <header className="w-full h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-md">
    <h1 className="text-xl font-bold">WebBuilder Studio</h1>
    <nav className="flex gap-6 text-sm">
      <Link href="/projects" className="hover:underline">
        Projects
      </Link>
      <Link href="/themes" className="hover:underline">
        Themes
      </Link>
      <Link href="/ai-assist" className="hover:underline">
        AI Assist
      </Link>
      <Link href="/export" className="hover:underline">
        Export
      </Link>
    </nav>
  </header>
);

export default Header;
