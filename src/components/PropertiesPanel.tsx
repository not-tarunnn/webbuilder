"use client";

import React from "react";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-4">
    <h3 className="text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wider">{title}</h3>
    <div className="space-y-2 bg-white p-2 rounded border text-sm">
      {children}
    </div>
  </div>
);

const PropertiesPanel = () => {
  return (
    <aside className="w-64 bg-gray-50 h-[calc(100vh-4rem)] p-4 border-l overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Properties</h2>
      <Section title="Layout">
        <label>Display:</label>
        <select className="w-full border px-2 py-1 rounded">
          <option>block</option>
          <option>flex</option>
          <option>inline</option>
        </select>
      </Section>
      <Section title="Spacing">
        <label>Padding:</label>
        <input type="range" min="0" max="64" className="w-full" />
      </Section>
      <Section title="Typography">
        <label>Font Size:</label>
        <input type="range" min="8" max="72" className="w-full" />
      </Section>
      <Section title="Colors">
        <label>Text Color:</label>
        <input type="color" className="w-full h-8" />
        <label>Background Color:</label>
        <input type="color" className="w-full h-8" />
      </Section>
      <Section title="Borders">
        <label>Border Radius:</label>
        <input type="range" min="0" max="50" className="w-full" />
      </Section>
      <Section title="Effects">
        <label>Shadow:</label>
        <select className="w-full border px-2 py-1 rounded">
          <option>none</option>
          <option>small</option>
          <option>medium</option>
          <option>large</option>
        </select>
      </Section>
      <Section title="Advanced">
        <label>Z-Index:</label>
        <input type="number" className="w-full border px-2 py-1 rounded" />
      </Section>
    </aside>
  );
};

export default PropertiesPanel;