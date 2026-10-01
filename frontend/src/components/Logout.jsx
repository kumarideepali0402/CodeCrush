import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link,  useNavigate } from "react-router";
import { removeUser } from "../utils/userSlice";
export default function Logout() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function onLogOut() {
    try {
      setIsSubmitting(true);
      setMessage("");
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      
      navigate("/login")
      setMessage(data.msg);
      return dispatch(removeUser())
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-200/70 border border-base-300 shadow-2xl rounded-3xl backdrop-blur-md">
        <div className="card-body items-center text-center p-8">
          <span className="text-5xl inline-block mb-2">👋</span>
          <h1 className="card-title text-3xl font-extrabold tracking-tight mt-1">Ready to Sign Out?</h1>
          <p className="text-sm text-base-content/70 mt-1 max-w-xs">
            You will need to sign in again to browse the developer feed and manage connections.
          </p>

          {message && (
            <div className="alert alert-info text-sm mt-4 w-full rounded-xl">
              <span>{message}</span>
            </div>
          )}

          <div className="card-actions mt-6 w-full flex flex-col gap-2">
            <button
              className="btn btn-error w-full rounded-xl font-bold shadow-md shadow-error/20"
              onClick={onLogOut}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner" />
              ) : "Log Out"}
            </button>
            <Link to="/" className="btn btn-ghost w-full rounded-xl font-semibold">
              Cancel & Stay Signed In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}