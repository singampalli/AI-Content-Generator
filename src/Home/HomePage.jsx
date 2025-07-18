import TemplateForm from "../TemplateEngine/TemplateForm";

export default function HomePage() {
  return (
   <div className="card border-0 shadow-lg bg-light p-3 rounded">
  <div className="card-body" style={{ padding: '5px' }}>
    <h2 className="text-primary mb-2 fw-bold">
      Every Great Idea Starts With a Prompt
    </h2>
    <p className="text-muted mb-4 fs-5">
      Choose a template to kick off your next piece whether it's a thoughtful message, a daily update, or an insightful explainer.
    </p>

      <TemplateForm />
    </div></div>
  );
}
