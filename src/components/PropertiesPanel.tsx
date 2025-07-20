"use client";

import React, { useState } from "react";

const ModernSlider = ({ label, value = 0, min = 0, max = 100, unit = "", isDarkMode = false }: {
  label: string;
  value?: number;
  min?: number;
  max?: number;
  unit?: string;
  isDarkMode?: boolean;
}) => {
  const [sliderValue, setSliderValue] = useState(value);
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          {label}
        </label>
        <span className={`text-xs font-mono px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
          {sliderValue}{unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
            isDarkMode 
              ? 'bg-gray-600 slider-thumb-dark' 
              : 'bg-gray-200 slider-thumb-light'
          }`}
          style={{
            background: `linear-gradient(to right, ${isDarkMode ? '#3B82F6' : '#3B82F6'} 0%, ${isDarkMode ? '#3B82F6' : '#3B82F6'} ${(sliderValue - min) / (max - min) * 100}%, ${isDarkMode ? '#4B5563' : '#E5E7EB'} ${(sliderValue - min) / (max - min) * 100}%, ${isDarkMode ? '#4B5563' : '#E5E7EB'} 100%)`
          }}
        />
      </div>
    </div>
  );
};

const ModernSelect = ({ label, options, isDarkMode = false }: {
  label: string;
  options: string[];
  isDarkMode?: boolean;
}) => (
  <div className="space-y-2">
    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      {label}
    </label>
    <select className={`w-full px-3 py-2.5 rounded-lg border-0 ring-1 transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
      isDarkMode 
        ? 'bg-gray-700 text-white ring-gray-600 focus:bg-gray-600' 
        : 'bg-white text-gray-900 ring-gray-300 focus:bg-gray-50'
    }`}>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const ModernColorPicker = ({ label, isDarkMode = false }: {
  label: string;
  isDarkMode?: boolean;
}) => (
  <div className="space-y-2">
    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      {label}
    </label>
    <div className="flex items-center space-x-3">
      <input 
        type="color" 
        className="w-10 h-10 rounded-lg border-0 cursor-pointer"
        defaultValue="#3B82F6"
      />
      <input 
        type="text" 
        defaultValue="#3B82F6"
        className={`flex-1 px-3 py-2 rounded-lg border-0 ring-1 font-mono text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
          isDarkMode 
            ? 'bg-gray-700 text-white ring-gray-600' 
            : 'bg-white text-gray-900 ring-gray-300'
        }`}
      />
    </div>
  </div>
);

const ModernNumberInput = ({ label, value = 0, isDarkMode = false }: {
  label: string;
  value?: number;
  isDarkMode?: boolean;
}) => (
  <div className="space-y-2">
    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      {label}
    </label>
    <input 
      type="number" 
      defaultValue={value}
      className={`w-full px-3 py-2.5 rounded-lg border-0 ring-1 transition-all duration-200 focus:ring-2 focus:ring-blue-500 ${
        isDarkMode 
          ? 'bg-gray-700 text-white ring-gray-600' 
          : 'bg-white text-gray-900 ring-gray-300'
      }`}
    />
  </div>
);

const Section = ({ title, children, isDarkMode = false, icon }: { 
  title: string; 
  children: React.ReactNode; 
  isDarkMode?: boolean;
  icon?: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className={`rounded-xl border transition-all duration-200 ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-opacity-50 transition-colors duration-200 rounded-t-xl"
      >
        <div className="flex items-center space-x-2">
          {icon && <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{icon}</span>}
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
        </div>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

interface PropertiesPanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isDarkMode?: boolean;
}

const PropertiesPanel = ({ isCollapsed, onToggle, isDarkMode = false }: PropertiesPanelProps) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`absolute -left-3 top-6 z-50 rounded-full w-7 h-7 flex items-center justify-center shadow-lg border transition-all duration-200 ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-300' 
            : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-600'
        }`}
        aria-label={isCollapsed ? "Expand properties panel" : "Collapse properties panel"}
      >
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <aside className={`${isCollapsed ? 'w-12' : 'w-80'} ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      } h-[calc(100vh-4rem)] border-l ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      } overflow-y-auto transition-all duration-300 ease-in-out`}>
        <div className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Header */}
          <div className={`sticky top-0 z-10 px-5 py-6 border-b ${
            isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center space-x-2">
              <svg className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Properties
              </h2>
            </div>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Customize your element
            </p>
          </div>

          {/* Content */}
          <div className="p-5 space-y-5">
            <Section 
              title="Layout" 
              isDarkMode={isDarkMode}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>}
            >
              <ModernSelect 
                label="Display" 
                options={['block', 'flex', 'inline-block', 'grid', 'inline']}
                isDarkMode={isDarkMode}
              />
              <ModernSelect 
                label="Position" 
                options={['static', 'relative', 'absolute', 'fixed', 'sticky']}
                isDarkMode={isDarkMode}
              />
            </Section>

            <Section 
              title="Spacing" 
              isDarkMode={isDarkMode}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
            >
              <ModernSlider label="Padding" value={16} max={64} unit="px" isDarkMode={isDarkMode} />
              <ModernSlider label="Margin" value={8} max={64} unit="px" isDarkMode={isDarkMode} />
              <ModernSlider label="Gap" value={4} max={32} unit="px" isDarkMode={isDarkMode} />
            </Section>

            <Section 
              title="Typography" 
              isDarkMode={isDarkMode}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            >
              <ModernSlider label="Font Size" value={16} min={8} max={72} unit="px" isDarkMode={isDarkMode} />
              <ModernSlider label="Line Height" value={24} min={16} max={80} unit="px" isDarkMode={isDarkMode} />
              <ModernSelect 
                label="Font Weight" 
                options={['100', '200', '300', '400', '500', '600', '700', '800', '900']}
                isDarkMode={isDarkMode}
              />
            </Section>

            <Section 
              title="Colors" 
              isDarkMode={isDarkMode}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" /></svg>}
            >
              <ModernColorPicker label="Text Color" isDarkMode={isDarkMode} />
              <ModernColorPicker label="Background" isDarkMode={isDarkMode} />
            </Section>

            <Section 
              title="Borders & Effects" 
              isDarkMode={isDarkMode}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            >
              <ModernSlider label="Border Radius" value={8} max={50} unit="px" isDarkMode={isDarkMode} />
              <ModernSlider label="Border Width" value={1} max={10} unit="px" isDarkMode={isDarkMode} />
              <ModernSelect 
                label="Box Shadow" 
                options={['none', 'sm', 'md', 'lg', 'xl', '2xl']}
                isDarkMode={isDarkMode}
              />
              <ModernSlider label="Opacity" value={100} max={100} unit="%" isDarkMode={isDarkMode} />
            </Section>

            <Section 
              title="Advanced" 
              isDarkMode={isDarkMode}
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            >
              <ModernNumberInput label="Z-Index" value={1} isDarkMode={isDarkMode} />
              <ModernSlider label="Transform Rotate" value={0} min={-180} max={180} unit="°" isDarkMode={isDarkMode} />
              <ModernSlider label="Transform Scale" value={100} min={0} max={200} unit="%" isDarkMode={isDarkMode} />
            </Section>
          </div>
        </div>
      </aside>

      <style jsx>{`
        .slider-thumb-light::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #3B82F6;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
        
        .slider-thumb-dark::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #3B82F6;
          border: 2px solid #374151;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }
        
        .slider-thumb-light::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #3B82F6;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
        
        .slider-thumb-dark::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #3B82F6;
          border: 2px solid #374151;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PropertiesPanel;
