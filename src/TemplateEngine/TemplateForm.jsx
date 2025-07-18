// TemplateForm.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function TemplateForm() {
  const [templates, setTemplates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [preview, setPreview] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/templates")
      .then((res) => setTemplates(res.data));
  }, []);

  const handleSelect = (id) => {
    console.log(id);
    setSelectedId(id);
    setFormValues({});
    setPreview("");
  };

  const handleGenerate = () => {
    const selectedTemplate = templates.find((t) => t.id === selectedId);
    let generated = selectedTemplate.body;
    Object.keys(formValues).forEach((key) => {
      generated = generated.replace(`{${key}}`, formValues[key]);
    });
    setPreview(generated);
  };

  useEffect(() => {
    if (selectedId) {
      const selectedTemplate = templates.find((t) => t.id === selectedId);
      const matches = [...selectedTemplate.body.matchAll(/{(.*?)}/g)].map(
        (m) => m[1]
      );
      console.log(matches);
      const inputs = {};
      matches.forEach((m) => (inputs[m] = ""));
      setFormValues(inputs);
    }
  }, [selectedId]);

  return (
    <div className="container mt-4">      
      <h4 className="mb-4 text-primary">Step 1: Select a Template</h4>
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

      {selectedId &&
        
        <> <h4 className="mb-4 text-primary">
              Step 2: Finalize Your Input to Generate the Prompt
            </h4>
          <div className="border p-4 rounded shadow-sm bg-light mb-3" id="template-form">
           

            {Object.keys(formValues).map((key) => (
              <div className="mb-3" key={key}>
                <label htmlFor={`field-${key}`} className="form-label">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`field-${key}`}
                  name={key}
                  value={formValues[key]}
                  onChange={(e) =>
                    setFormValues({ ...formValues, [key]: e.target.value })
                  }
                  placeholder={`Enter ${key.replace("_", " ")}`}
                />
              </div>
            ))}

            <button className="btn btn-success mt-3" onClick={handleGenerate}>
              Generate Prompt
            </button>
          </div>
        </>
    }

      
      {preview && (
        <div className="alert alert-success mt-3">
          <h4 className="alert-heading">Generated Prompt:</h4>
          <p className="mb-0">{preview}</p>
        </div>
      )}
    </div>
  );
}
