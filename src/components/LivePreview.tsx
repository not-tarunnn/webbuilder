"use client";

import React, { useRef, useEffect } from "react";

const LivePreview = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`<!DOCTYPE html><html><head><style>body{font-family:sans-serif;}</style></head><body><h2>Edit me!</h2></body></html>`);
        doc.close();
      }
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border"
      sandbox="allow-scripts allow-same-origin"
    ></iframe>
  );
};

export default LivePreview;
