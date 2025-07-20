// DynamicPromptForm.jsx
export default function DynamicPromptForm({
  formValues,
  setFormValues,
  handleGenerate,
}) {
  return (
    <>
      <h4 className="mb-4 text-success">
        Finalize Your Input to Generate the Prompt
      </h4>
      <div
        className="border p-4 rounded shadow-sm bg-light mb-3"
        id="template-form"
      >
        {Object.keys(formValues).map((key) => (
          <div className="mb-3" key={key}>
            <label
              htmlFor={`field-${key}`}
              className="form-label text-success fw-bold"
            >
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
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
              placeholder={`Enter ${key.replace(/_/g, " ")}`}
            />
          </div>
        ))}

        <button className="btn btn-success mt-3" onClick={handleGenerate}>
          Generate Prompt
        </button>
      </div>
    </>
  );
}
