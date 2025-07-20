// GeneratedPrompt.jsx
import { useState } from "react";
import openAIService from "../services/openAIService";
import PromptRenderer from "./PromptRenderer";

export default function GeneratedPrompt({ promptText }) {
  const [aiOutput, setAiOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateAI = async () => {
    try {
      setLoading(true);
      const result = await openAIService.generateFromPrompt(promptText);
      setAiOutput(result);
    } catch (error) {
      setAiOutput("Something went wrong while generating AI output.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <div id="step-3">
        <h4 className="mb-4 text-success">
         View Your Generated Prompt
        </h4>
        <div className="alert alert-success mt-3">
          <h4 className="alert-heading">Generated Prompt:</h4>
          <p className="mb-0">{promptText}</p>
        </div>
      </div>

      <button
        className="btn btn-outline-success mb-3"
        onClick={handleGenerateAI}
        disabled={loading}
      >
        {loading ? "Generating with AI..." : "Cast the Prompt Spell"}
      </button>

      {aiOutput && (
        <div>
          <h4 className="mb-4 text-success">Use AI-Generated Content</h4>
          <div className="alert alert-info">
            <PromptRenderer response={aiOutput} />
          </div>
        </div>
      )}
    </div>
  );
}
