import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import openAIService from "../services/openAIService";
import PromptRenderer from "../TemplateEngine/PromptRenderer";

export const PromptInterface = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setLoading(true);

      try {
        const result = await openAIService.generateContentFromPrompt(prompt);
        console.log("AI Output:", result);
        setOutput(result);
        document.getElementById("promptInput").value = ''; // Clear the input after submission
      } catch (err) {
        console.error("Error generating content:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mt-3">
      {/* AI Output Block */}
      <div className="row mb-2">
        <div className="col-12">
          {loading ? (
            <div className="text-center my-5">
              
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="mt-2">Generating response...</div>
            </div>
          ) : (
            <>
              {output && <div className='alert alert-success'>{prompt}</div>}
              <PromptRenderer response={output} />
            </>
          )}
        </div>
      </div>

      {/* Prompt Textarea */}
      <div className="row">
        <div className="col-12">
          <textarea
            className="form-control"
            id="promptInput"
            placeholder="✍️ Type your prompt and press Enter..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};