"use client";

import Editor from "@monaco-editor/react";
import React, { useState, useRef, useEffect } from "react";

interface CodeEditorProps {
  htmlCode: string;
  setHtmlCode: (code: string) => void;
  cssCode: string;
  setCssCode: (code: string) => void;
  jsCode: string;
  setJsCode: (code: string) => void;
  isDarkMode?: boolean;
  windowState?: {
    isMinimized: boolean;
    isDragging: boolean;
    isDetached: boolean;
    position: { x: number; y: number };
  };
  onMinimize?: () => void;
  onStartDrag?: () => void;
  onStopDrag?: () => void;
  onDetach?: () => void;
  onRestore?: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  htmlCode,
  setHtmlCode,
  cssCode,
  setCssCode,
  jsCode,
  setJsCode,
  isDarkMode = false,
  windowState = { isMinimized: false, isDragging: false, isDetached: false, position: { x: 0, y: 0 } },
  onMinimize,
  onStartDrag,
  onStopDrag,
  onDetach,
  onRestore
}) => {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const getCurrentCode = () => {
    if (activeTab === "html") return htmlCode;
    if (activeTab === "css") return cssCode;
    return jsCode;
  };

  const handleChange = (value: string | undefined) => {
    const val = value || "";
    if (activeTab === "html") setHtmlCode(val);
    else if (activeTab === "css") setCssCode(val);
    else setJsCode(val);
  };

  const getLanguage = () => {
    if (activeTab === "html") return "html";
    if (activeTab === "css") return "css";
    return "javascript";
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowState.isDetached) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - windowState.position.x,
        y: e.clientY - windowState.position.y
      });
      onStartDrag?.();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && windowState.isDetached) {
      const newPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      };
      
      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${newPosition.x}px, ${newPosition.y}px)`;
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onStopDrag?.();
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const containerClasses = `
    ${windowState.isDetached ? 'fixed z-50 shadow-2xl' : 'relative'} 
    ${windowState.isMinimized ? 'h-12' : 'h-full'} 
    ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
    border rounded-lg overflow-hidden transition-all duration-300 ease-in-out
    ${windowState.isDetached ? 'w-96 h-80' : 'w-full'}
  `;

  return (
    <div 
      ref={containerRef}
      className={containerClasses}
      style={windowState.isDetached ? {
        left: windowState.position.x,
        top: windowState.position.y,
        transform: `translate(${windowState.position.x}px, ${windowState.position.y}px)`
      } : {}}
    >
      {/* Traffic Light Header */}
      <div 
        className={`flex items-center justify-between px-4 py-3 border-b ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        } ${windowState.isDetached ? 'cursor-move' : ''}`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-3">
          {/* Traffic Light Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={onMinimize}
              className="w-3 h-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors duration-150 flex items-center justify-center group"
              title="Minimize"
            >
              <span className="text-red-800 text-xs hidden group-hover:block">-</span>
            </button>
            <button
              onClick={() => windowState.isDetached ? onRestore?.() : onDetach?.()}
              className="w-3 h-3 bg-yellow-500 hover:bg-yellow-600 rounded-full transition-colors duration-150 flex items-center justify-center group"
              title={windowState.isDetached ? "Reattach" : "Detach"}
            >
              <span className="text-yellow-800 text-xs hidden group-hover:block">
                {windowState.isDetached ? "⤢" : "⤡"}
              </span>
            </button>
            <button
              onClick={onRestore}
              className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors duration-150 flex items-center justify-center group"
              title="Maximize"
            >
              <span className="text-green-800 text-xs hidden group-hover:block">+</span>
            </button>
          </div>
          
          <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Code Editor
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`text-xs px-2 py-1 rounded ${
            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            {activeTab.toUpperCase()}
          </div>
        </div>
      </div>

      {!windowState.isMinimized && (
        <>
          {/* Tab Navigation */}
          <div className={`flex border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {["html", "css", "js"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "html" | "css" | "js")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab 
                    ? "border-blue-500 text-blue-600" 
                    : isDarkMode 
                      ? "border-transparent text-gray-400 hover:text-gray-200" 
                      : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex items-center space-x-1">
                  <span>{tab.toUpperCase()}</span>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    .{tab}
                  </span>
                </span>
              </button>
            ))}
          </div>

                    {/* Editor */}
          <div className="flex-1 relative">
            <Editor
              height="calc(100vh - 300px)"
              language={getLanguage()}
              value={getCurrentCode()}
              theme={isDarkMode ? "vs-dark" : "light"}
              onChange={handleChange}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
                fontFamily: "'Fira Code', 'Monaco', 'Menlo', monospace",
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                renderLineHighlight: "line",
                readOnly: false,
                domReadOnly: false,
                contextmenu: true,
                selectOnLineNumbers: true
              }}
            />
          </div>
        </>
      )}
      
      {windowState.isMinimized && (
        <div className={`flex items-center justify-center h-full ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span className="text-sm">Editor minimized - {activeTab.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
