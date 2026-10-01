import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function NavBar() {
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests);

  const pendingCount = requests ? requests.length : 0;

  return (
    <div className="navbar bg-base-300/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-200 px-4 md:px-8 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold tracking-tight gap-2 flex items-center">
          <span className="text-2xl">👩‍💻</span>
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            DevTinder
          </span>
        </Link>
      </div>

      <div className="flex-none gap-3 items-center">
        {user ? (
          <>
            <span className="hidden sm:inline-block font-medium text-sm text-base-content/80">
              Welcome, <span className="font-semibold text-base-content">{user?.name}</span>
            </span>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary transition-all duration-200"
              >
                <div className="w-10 rounded-full ring-1 ring-base-content/10 overflow-hidden shadow">
                  <img
                    alt="User avatar"
                    src={user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200/95 backdrop-blur-md rounded-2xl z-50 mt-3 w-56 p-3 shadow-2xl border border-base-300 space-y-1"
              >
                <li className="menu-title px-2 py-1 text-xs opacity-60">
                  Signed in as <span className="font-semibold">{user.email || user.name}</span>
                </li>
                <li>
                  <Link to="/profile" className="flex justify-between py-2 rounded-lg font-medium">
                    Profile
                    <span className="badge badge-sm badge-primary">Edit</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="py-2 rounded-lg font-medium">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="flex justify-between py-2 rounded-lg font-medium">
                    Requests
                    {pendingCount > 0 && (
                      <span className="badge badge-sm badge-secondary">{pendingCount}</span>
                    )}
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <Link to="/logout" className="py-2 text-error hover:bg-error/10 rounded-lg font-medium">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm font-semibold">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm shadow font-semibold">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}