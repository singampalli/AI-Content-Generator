import React, { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer"; // Import the MarkdownRenderer

const PromptRenderer = ({ response }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="aiOutput container mt-4">
      {/* Markdown Output Box */}
      <div        
        style={{ minHeight: "300px", maxHeight: "500px", overflowY: "auto" }}
      >
        <MarkdownRenderer markdown={response} />
      </div>

      {/* Copy Button + Feedback */}
      <div className="d-flex justify-content-end align-items-center">
        <button
          className="copyicon btn btn-outline-secondary"
          title="Copy to clipboard"
          onClick={handleCopy}
        >
          📋
        </button>
        {copied && (
          <span className="ms-2 text-success align-self-center">Copied!</span>
        )}
      </div>
    </div>
  );
};

export default PromptRenderer;
