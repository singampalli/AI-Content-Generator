import Header from "./Header";
export default function Layout({ children }) {
  return (
    <div className="container mt-5">
      <Header />
      <main>{children}</main>
      <footer className="mt-4 text-center text-muted">
        &copy; {new Date().getFullYear()} DecodeAIDaily.com
      </footer>
    </div>
  );
}
