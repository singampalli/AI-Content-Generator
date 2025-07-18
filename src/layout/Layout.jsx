import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="container mt-5">
      <header className="bg-gradient shadow-sm py-3 px-4 d-flex justify-content-between align-items-center rounded-bottom border-bottom border-secondary">
        <div className="d-flex align-items-center">          
          <h1 className="text-light fw-bold m-0 display-6">
            AI Content Generator
          </h1>
        </div>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer className="mt-4 text-center text-muted">
        &copy; {new Date().getFullYear()} My Company
      </footer>
    </div>
  );
}
