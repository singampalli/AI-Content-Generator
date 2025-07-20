import { useState } from "react";
import templateService from "../services/templateService";

export default function TemplateCreator({ onClose, templateToEdit = null }) {
  const [templateName, setTemplateName] = useState(templateToEdit?.name || "");
  const [templateBody, setTemplateBody] = useState(templateToEdit?.body || "");
  const [selectedId, setSelectedId] = useState(templateToEdit?.id || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!templateName.trim() || !templateBody.trim()) {
      setError("Please fill out both name and body fields.");
      return;
    }

    const payload = {
      name: templateName.trim(),
      body: templateBody.trim(),
    };

    try {
      setLoading(true);
      setError("");

      if (selectedId) {
        await templateService.updateTemplate(selectedId, payload);
      } else {
        await templateService.createTemplate(payload);
      }

      // Reset form
      setTemplateName("");
      setTemplateBody("");
      setSelectedId(null);

      if (onClose) onClose(); // 🎉 Close parent dialog on success
    } catch (err) {
      console.error("Failed to save template:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3">
      <form>
        <div className="mb-3">
          <label htmlFor="templateName" className="form-label text-success">
            Template Name
          </label>
          <input
            id="templateName"
            type="text"
            className="form-control"
            placeholder="Enter template name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="templateBody" className="form-label text-success">
            Template Body
          </label>
          <textarea
            id="templateBody"
            className="form-control"
            rows="6"
            placeholder="Write your prompt using placeholders like {inputname}"
            value={templateBody}
            onChange={(e) => setTemplateBody(e.target.value)}
          />
        </div>

        {error && <div className="text-danger mb-2">{error}</div>}

        <button
          type="button"
          className={`btn btn-success ${loading ? "disabled" : ""}`}
          onClick={handleSave}
        >
          {loading ? "Saving..." : selectedId ? "Update Template" : "Save Template"}
        </button>
      </form>
    </div>
  );
}