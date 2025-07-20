import React, { useState, useEffect } from "react";
import templateService from "../services/templateService";
import DynamicPromptForm from "./DynamicForm/DynamicPromptForm";
import { generatePrompt } from "../utils/generatePrompt";
import GeneratedPrompt from "./GeneratedPrompt";

const steps = [
  { key: "step1", label: "Step 1" },
  { key: "step2", label: "Step 2" },
  { key: "step3", label: "Step 3" },
  { key: "step4", label: "Step 4" },
];

const TemplateGenerator = () => {
  const [activeTab, setActiveTab] = useState("step1");
  const [templates, setTemplates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [preview, setPreview] = useState("");

  useEffect(() => {
    templateService.getAllTemplates().then((data) => setTemplates(data));
  }, []);
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

  const switchTab = (tabId) => {
    setActiveTab(tabId);
  };
  const handleSelect = (id) => {
    if (id !== "") {
      switchTab("step2");
      setSelectedId(id);
      setFormValues({});
      setPreview("");
    }
  };
  const handleGenerate = () => {
    const selectedTemplate = templates.find((t) => t.id === selectedId);
    const finalText = generatePrompt(selectedTemplate.body, formValues);
    setPreview(finalText);
    switchTab("step3");
  };
  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs">
        <li className="nav-item ">
          <button
            className={`text-success nav-link${activeTab === "step1" ? " active" : ""}`}
            onClick={() => setActiveTab("step1")}
            type="button"
          >
            Step 1
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`text-success nav-link${activeTab === "step2" ? " active" : ""}`}
            onClick={() => setActiveTab("step2")}
            type="button"
          >
            Step 2
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`text-success  nav-link${activeTab === "step3" ? " active" : ""}`}
            onClick={() => setActiveTab("step3")}
            type="button"
          >
            Step 3
          </button>
        </li>
        
      </ul>
      <div className="tab-content p-4 border border-top-0">
        <div
          className={`tab-pane fade${
            activeTab === "step1" ? " show active" : ""
          }`}
        >
          <h4 className="mb-4 text-success"> Select a Template</h4>
          <div className="mb-3">
            <select
              className="form-select"
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option value="">Select Template</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          className={`tab-pane fade${
            activeTab === "step2" ? " show active" : ""
          }`}
        >
          {selectedId && (
            <div id="step-2">
              <DynamicPromptForm
                formValues={formValues}
                setFormValues={setFormValues}
                handleGenerate={handleGenerate}
              />
            </div>
          )}
        </div>
        <div
          className={`tab-pane fade${
            activeTab === "step3" ? " show active" : ""
          }`}
        >
          {preview && <GeneratedPrompt promptText={preview} />}
        </div>
      </div>
    </div>
  );
};

export default TemplateGenerator;
