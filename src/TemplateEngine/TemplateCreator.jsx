// TemplateCreator.jsx
import { useState } from 'react';
import axios from 'axios';

export default function TemplateCreator() {
  const [templateName, setTemplateName] = useState('');
  const [templateBody, setTemplateBody] = useState('');

  const handleSave = async () => {
    await axios.post('http://localhost:3001/templates', {
      name: templateName,
      body: templateBody
    });
    setTemplateName('');
    setTemplateBody('');
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2 className="mb-4 text-primary">Create Prompt Template</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="templateName" className="form-label text-primary">Template Name</label>
          <input
            id="templateName"
            type="text"
            className="form-control"
            placeholder="Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="templateBody" className="form-label text-primary">Template Body</label>
          <textarea
            id="templateBody"
            className="form-control"
            rows="6"
            placeholder="Write your prompt with {inputname} etc."
            value={templateBody}
            onChange={(e) => setTemplateBody(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save Template
        </button>
      </form>
    </div>
  );
}