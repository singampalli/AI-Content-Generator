// TemplateForm.jsx
import { useState, useEffect } from "react";
import DynamicPromptForm from "./DynamicForm/DynamicPromptForm";
import templateService from "../services/templateService";
import { generatePrompt } from "../utils/generatePrompt";
import GeneratedPrompt from "./GeneratedPrompt";

export default function TemplateForm() {
  const [templates, setTemplates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [preview, setPreview] = useState("");

  useEffect(() => {
    templateService.getAllTemplates().then((data) => setTemplates(data));
  }, []);
  const handleGenerate = () => {
    const selectedTemplate = templates.find((t) => t.id === selectedId);
    const finalText = generatePrompt(selectedTemplate.body, formValues);
    setPreview(finalText);
  };
  const handleSelect = (id) => {
    setSelectedId(id);
    setFormValues({});
    setPreview("");
  };

  useEffect(() => {
    if (selectedId) {
      const selectedTemplate = templates.find((t) => t.id === selectedId);
      const matches = [...selectedTemplate.body.matchAll(/{(.*?)}/g)].map(
        (m) => m[1]
      );
      const inputs = {};
      matches.forEach((m) => (inputs[m] = ""));
      setFormValues(inputs);
    }
  }, [selectedId]);

  return (
    <div className="container mt-4">
      <h4 className="mb-4 text-success">Step 1: Select a Template</h4>
      <div id="step-1">
        <div className="mb-3">
          <select
            className="form-select"
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option>Select Template</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedId && (
         <div id="step-2">
          <DynamicPromptForm
            formValues={formValues}
            setFormValues={setFormValues}
            handleGenerate={handleGenerate}
          />
        </div>
      )}

      {preview && (
        
          <GeneratedPrompt promptText={preview} />
    
      )}
    </div>
  );
}
