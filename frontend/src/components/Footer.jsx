import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-300/80 backdrop-blur-md text-base-content items-center justify-between p-4 px-6 border-t border-base-200 mt-auto">
      <aside className="flex items-center gap-2">
        <span className="text-xl">👩‍💻</span>
        <p className="text-sm font-medium">
          <span className="font-bold">DevTinder</span> — Connect with developers worldwide. © {new Date().getFullYear()}
        </p>
      </aside>
      <nav className="flex items-center gap-6 text-sm">
        <Link to="/" className="link link-hover hover:text-primary transition-colors">
          Feed
        </Link>
        <Link to="/connections" className="link link-hover hover:text-primary transition-colors">
          Connections
        </Link>
        <Link to="/profile" className="link link-hover hover:text-primary transition-colors">
          Profile
        </Link>
      </nav>
    </footer>
  );
}