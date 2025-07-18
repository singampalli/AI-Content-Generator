import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div className="d-flex gap-3 align-items-center">
        <Link className="navbar-brand me-3 btn btn-outline-light btn-sm" to="/">
          <i className="bi bi-house"></i>
        </Link>
        <div className="dropdown">
          <button
            className="btn btn-outline-light btn-sm dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Menu
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link className="dropdown-item" to="/create-template">
                Create New Template
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
