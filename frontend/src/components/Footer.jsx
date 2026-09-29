import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-300 text-base-content items-center p-4 fixed bottom-0">
      <aside className="grid-flow-col items-center">
        <p>👩‍💻 DevTinder — Connect with developers. © {new Date().getFullYear()}</p>
      </aside>
      <nav className="grid-flow-col gap-4 sm:place-self-center sm:justify-self-end">
        <Link to="/" className="link link-hover">
          Feed
        </Link>
        <Link to="/profile" className="link link-hover">
          Profile
        </Link>
        <Link to="/login" className="link link-hover">
          Login
        </Link>
      </nav>
    </footer>
  );
}