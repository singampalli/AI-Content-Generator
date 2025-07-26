// MarkdownRenderer.js

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub-flavored Markdown
import rehypeRaw from "rehype-raw"; // Allow raw HTML in Markdown


const MarkdownRenderer = ({ markdown }) => {
  return (
    <div className="markdown-container"  style={{
                  minHeight: "300px",
                  maxHeight: "500px", // optional, for scroll threshold
                  overflowY: "auto",
                }}>
      <ReactMarkdown 
        children={markdown}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      />
    </div>
  );
};

export default MarkdownRenderer;