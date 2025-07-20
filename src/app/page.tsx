"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LivePreview from "@/components/LivePreview";
import PropertiesPanel from "@/components/PropertiesPanel";
import CodeEditor from "@/components/CodeEditor";
import TerminalFooter from "@/components/TerminalFooter";
import "@/app/globals.css";

import React, { useState } from "react";

export default function HomePage() {
  const [htmlCode, setHtmlCode] = useState(`
<div class="box">
  <h1>Hello, World!</h1>
  <p>This is a test of HTML and CSS tabs.</p>
</div>
`);

  const [cssCode, setCssCode] = useState(`
.box {
  padding: 2rem;
  background-color: #fef08a;
  border-radius: 8px;
  text-align: center;
  font-family: sans-serif;
}
`);

      const [jsCode, setJsCode] = useState(`console.log("JS tab test");`);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPropertiesPanelCollapsed, setIsPropertiesPanelCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Window states for Live Preview and Code Editor
  const [livePreviewState, setLivePreviewState] = useState({
    isMinimized: false,
    isDragging: false,
    isDetached: false,
    position: { x: 0, y: 0 }
  });

  const [codeEditorState, setCodeEditorState] = useState({
    isMinimized: false,
    isDragging: false,
    isDetached: false,
    position: { x: 0, y: 0 }
  });

  const combinedCode = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>${jsCode}</script>
      </body>
    </html>
  `;

  return (
        <div className={`flex flex-col h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
            <Header
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isDarkMode={isDarkMode}
        />
                <main className="flex-1 p-4 grid grid-cols-2 gap-4 overflow-hidden">
          <LivePreview
            htmlCode={combinedCode}
            isDarkMode={isDarkMode}
            windowState={livePreviewState}
            onMinimize={() => setLivePreviewState(prev => ({ ...prev, isMinimized: !prev.isMinimized }))}
            onStartDrag={() => setLivePreviewState(prev => ({ ...prev, isDragging: true }))}
            onStopDrag={() => setLivePreviewState(prev => ({ ...prev, isDragging: false }))}
            onDetach={() => setLivePreviewState(prev => ({
              ...prev,
              isDetached: true,
              position: { x: window.innerWidth / 4, y: window.innerHeight / 4 }
            }))}
            onRestore={() => setLivePreviewState(prev => ({
              ...prev,
              isDetached: false,
              isMinimized: false,
              position: { x: 0, y: 0 }
            }))}
          />
          <CodeEditor
            htmlCode={htmlCode}
            setHtmlCode={(val) => setHtmlCode(val || "")}
            cssCode={cssCode}
            setCssCode={(val) => setCssCode(val || "")}
            jsCode={jsCode}
            setJsCode={(val) => setJsCode(val || "")}
            isDarkMode={isDarkMode}
            windowState={codeEditorState}
            onMinimize={() => setCodeEditorState(prev => ({ ...prev, isMinimized: !prev.isMinimized }))}
            onStartDrag={() => setCodeEditorState(prev => ({ ...prev, isDragging: true }))}
            onStopDrag={() => setCodeEditorState(prev => ({ ...prev, isDragging: false }))}
            onDetach={() => setCodeEditorState(prev => ({
              ...prev,
              isDetached: true,
              position: { x: window.innerWidth / 2, y: window.innerHeight / 4 }
            }))}
            onRestore={() => setCodeEditorState(prev => ({
              ...prev,
              isDetached: false,
              isMinimized: false,
              position: { x: 0, y: 0 }
            }))}
          />
        </main>
                <PropertiesPanel
          isCollapsed={isPropertiesPanelCollapsed}
          onToggle={() => setIsPropertiesPanelCollapsed(!isPropertiesPanelCollapsed)}
          isDarkMode={isDarkMode}
        />
</div>
<TerminalFooter
  htmlCode={htmlCode}
  cssCode={cssCode}
  jsCode={jsCode}
  isDarkMode={isDarkMode}
/>
</div>

  );
}
