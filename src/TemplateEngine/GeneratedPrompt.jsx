// GeneratedPrompt.jsx
import { useState } from "react";
import openAIService from "../services/openAIService";
import PromptRenderer from "./PromptRenderer";

export default function GeneratedPrompt({ promptText }) {
  const [aiOutput, setAiOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(true);
  const handleToggle = () => setIsOpen(!isOpen);

  const handleGenerateAI = async () => {
    try {
      setLoading(true);
      const result = await openAIService.generateContentFromPrompt(promptText);
      console.log("AI Output:", result);
      setAiOutput(result);
      setIsOpen(false);
    } catch (error) {

      setAiOutput("Something went wrong while generating AI output.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        className="btn btn-outline-success mb-3 pull-right"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="step-3"
      >
        {isOpen ? "Hide Prompt" : "View Prompt"}
      </button>
      <div id="step-3" className={isOpen ? "show" : "collapse"}>
        <h4 className="mb-4 text-success">View Your Generated Prompt</h4>
        <div className="alert alert-success mt-3">
          <p className="mb-0">{promptText}</p>
        </div>
      </div>
      <div className="clearfix"></div>
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
