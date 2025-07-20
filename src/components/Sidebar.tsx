"use client";

import React from "react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isDarkMode?: boolean;
}

const Sidebar = ({ isCollapsed, onToggle, isDarkMode = false }: SidebarProps) => (
  <aside 
        className={`${isCollapsed ? 'w-12' : 'w-60'} ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} h-[calc(100vh-4rem)] border-r transition-all duration-300 ease-in-out relative`}
  >
    <button
      onClick={onToggle}
                  className="absolute -right-3 top-4 z-10 bg-white hover:bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center shadow-lg border border-gray-300 transition-colors duration-200"
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <svg 
                        className={`w-3 h-3 text-gray-600 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <div className={`p-4 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <h2 className={`${isDarkMode ? 'text-white' : 'text-gray-950'} text-lg font-semibold mb-4`}>Components</h2>
      <ul className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2 text-sm`}>
        <li className={`cursor-pointer ${isDarkMode ? 'hover:text-white hover:bg-gray-700' : 'hover:text-gray-900 hover:bg-gray-200'} p-2 rounded transition-colors`}>Button</li>
        <li className={`cursor-pointer ${isDarkMode ? 'hover:text-white hover:bg-gray-700' : 'hover:text-gray-900 hover:bg-gray-200'} p-2 rounded transition-colors`}>Text</li>
        <li className={`cursor-pointer ${isDarkMode ? 'hover:text-white hover:bg-gray-700' : 'hover:text-gray-900 hover:bg-gray-200'} p-2 rounded transition-colors`}>Image</li>
        <li className={`cursor-pointer ${isDarkMode ? 'hover:text-white hover:bg-gray-700' : 'hover:text-gray-900 hover:bg-gray-200'} p-2 rounded transition-colors`}>Container</li>
        <li className={`cursor-pointer ${isDarkMode ? 'hover:text-white hover:bg-gray-700' : 'hover:text-gray-900 hover:bg-gray-200'} p-2 rounded transition-colors`}>Form</li>
      </ul>
    </div>
  </aside>
);

export default Sidebar;
