import React, { useState } from "react";

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
    <div className="aiOutput">
      <div class="d-flex align-items-start justify-content-between">
        <div class="width95">
          <pre>{response}</pre>
        </div>
        <div class="width3">
          <div className="copy-wrapper position-relative">
            <button
              className="copyicon"
              title="Copy to clipboard"
              onClick={handleCopy}
            >
              📋
            </button>
            {copied && <span className="copy-feedback">Copied!</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptRenderer;
