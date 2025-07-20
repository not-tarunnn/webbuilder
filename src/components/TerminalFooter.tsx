"use client";

import React, { useState, useEffect, useRef } from "react";

export default function TerminalFooter({
  htmlCode,
  cssCode,
  jsCode,
  isDarkMode = false,
}: {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  isDarkMode?: boolean;
}) {
  const [logs, setLogs] = useState<string[]>(["> Type 'help' to get started."]);
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  const log = (text: string) => setLogs((prev) => [...prev, text]);

  const downloadFile = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const runCommand = (command: string) => {
    switch (command) {
      case "help":
        log("Available commands: clear, save-html, save-css, save-js, time, log, help");
        break;

      case "clear":
        setLogs([]);
        break;

      case "time":
        log(`> ${new Date().toLocaleTimeString()}`);
        break;

      case "log":
        log("HTML, CSS, JS states logged.");
        console.log({ htmlCode, cssCode, jsCode });
        break;

      case "save-html":
        const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>${cssCode}</style>
</head>
<body>
  ${htmlCode}
  <script>${jsCode}</script>
</body>
</html>`.trim();
        downloadFile("webpage.html", fullHtml, "text/html");
        log("✅ HTML downloaded as webpage.html");
        break;

      case "save-css":
        downloadFile("styles.css", cssCode, "text/css");
        log("✅ CSS downloaded as styles.css");
        break;

      case "save-js":
        downloadFile("script.js", jsCode, "text/javascript");
        log("✅ JS downloaded as script.js");
        break;

      default:
        log(`Unknown command: ${command}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLogs((prev) => [...prev, `> ${input}`]);
      runCommand(input.trim());
      setInput("");
    }
  };

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [logs]);

  return (
    <div className={`font-mono text-xs p-3 border-t transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-900 text-green-400 border-gray-700' 
        : 'bg-gray-50 text-gray-700 border-gray-200'
    }`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-red-500' : 'bg-red-400'}`}></div>
            <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-yellow-500' : 'bg-yellow-400'}`}></div>
            <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-green-500' : 'bg-green-400'}`}></div>
          </div>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Terminal
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Commands: help, clear, save-html
          </span>
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={terminalRef}
        className={`overflow-y-auto max-h-24 whitespace-pre-wrap mb-2 p-2 rounded border ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}
      >
        {logs.map((log, idx) => (
          <div key={idx} className={`${
            log.startsWith('✅') 
              ? isDarkMode ? 'text-green-400' : 'text-green-600'
              : log.startsWith('>')
              ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
              : isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {log}
          </div>
        ))}
      </div>

      {/* Terminal Input */}
      <div className={`flex items-center space-x-2 p-2 rounded border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <span className={`${isDarkMode ? 'text-green-400' : 'text-blue-600'}`}>
          $
        </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`flex-1 outline-none bg-transparent ${
            isDarkMode ? 'text-green-400 placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'
          }`}
          placeholder="Type a command..."
          autoFocus
        />
      </div>
    </div>
  );
}
