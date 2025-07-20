import { useEffect, useState } from "react";
import templateService from "../services/templateService";
import TemplateCreator from "./TemplateCreator";
export default function TemplateGrid({ onEdit }) {
  const charactersLimit = 100;
  const [templates, setTemplates] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState(null);
  const handleEdit = (template) => {
    setTemplateToEdit(template); 
    setShowDialog(true); 
  };
  useEffect(() => {
    templateService.getAllTemplates().then((templates) => {      
      setTemplates(templates);
    });
  }, [showDialog]);

  const handleDelete = async (id) => {
    await templateService.deleteTemplate(id);
    const updated = templates.filter((t) => t.id !== id);
    setTemplates(updated);
  };

  return (
    <div className="mt-4">
      <div className="d-flex align-items-center mb-3 justify-content-between">
        <h5 className="text-success mb-0 me-2">Prompt Templates</h5>
        <button
          className="btn btn-success btn-sm"
          title="Create New Template"
          onClick={() => {setShowDialog(true); setTemplateToEdit(null);}}
        >
          <i className="bi bi-plus-circle"></i>
        </button>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Template Text</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td>{template.name}</td>
              <td>
                {template.body?.length > charactersLimit
                  ? template.body.slice(0, charactersLimit) + "..."
                  : template.body}
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(template)}
                    title="Edit"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(template.id)}
                    title="Delete"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDialog && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-success">
                  {templateToEdit ? "Edit Template" : "Create New Template"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowDialog(false)}
                ></button>
              </div>
              <div className="modal-body">
                <TemplateCreator
                  templateToEdit={templateToEdit}
                  onClose={() => {
                    setShowDialog(false);
                    setTemplateToEdit(null); // cleanup
                  }}
                />
              </div>
              <div className="modal-footer">                
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {setShowDialog(false); setTemplateToEdit(null);}}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
