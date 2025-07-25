"use client";

import React, { useRef, useEffect, useState } from "react";

interface LivePreviewProps {
  htmlCode: string;
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

const LivePreview: React.FC<LivePreviewProps> = ({ 
  htmlCode, 
  isDarkMode = false,
  windowState = { isMinimized: false, isDragging: false, isDetached: false, position: { x: 0, y: 0 } },
  onMinimize,
  onStartDrag,
  onStopDrag,
  onDetach,
  onRestore
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && !windowState.isMinimized) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(htmlCode);
        doc.close();
      }
    }
  }, [htmlCode, windowState.isMinimized]);

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
    ${windowState.isDetached ? 'w-96 h-64' : 'w-full'}
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
            Live Preview
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`text-xs px-2 py-1 rounded ${
            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            Live
          </div>
        </div>
      </div>

      {/* Content Area */}
      {!windowState.isMinimized && (
        <div className="h-full p-2">
          <iframe
            ref={iframeRef}
            className={`w-full h-full border rounded ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
      
      {windowState.isMinimized && (
        <div className={`flex items-center justify-center h-full ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span className="text-sm">Preview minimized</span>
        </div>
      )}
    </div>
  );
};

export default LivePreview;
