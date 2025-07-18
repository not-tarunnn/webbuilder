"use client";

import React from "react";

const Sidebar = () => (
  <aside className="w-60 bg-gray-100 h-[calc(100vh-4rem)] p-4 border-r">
    <h2 className="text-lg font-semibold mb-4">Components</h2>
    <ul className="space-y-2 text-sm">
      <li>Button</li>
      <li>Text</li>
      <li>Image</li>
      {/* Placeholder only for now */}
    </ul>
  </aside>
);

export default Sidebar;