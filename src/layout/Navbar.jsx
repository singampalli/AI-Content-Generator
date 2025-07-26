import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div className="d-flex gap-3">
        <Link className="btn btn-outline-light btn-sm icons-nav-bar" to="/">
          <i className="bi bi-house "></i>
        </Link>
       
        <Link className="btn btn-outline-light btn-sm icons-nav-bar" to="/AIChat">
          <i className="bi bi-chat-dots"></i>
        </Link>
         <Link
          className="btn btn-outline-light btn-sm icons-nav-bar"
          to="/create-template"
        >
          <i className="bi bi-gear"></i>
        </Link>
      </div>
    </>
  );
}
