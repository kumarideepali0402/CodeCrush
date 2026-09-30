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
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <p className="text-4xl">👋</p>
          <h1 className="card-title text-3xl mt-2">Log out?</h1>
          <p className="text-base-content/70">
            You will need to sign in again to see your feed and connections.
          </p>

          {message && (
            <div className="alert alert-info text-sm mt-4 w-full">
              <span>{message}</span>
            </div>
          )}

          <div className="card-actions mt-6 w-full">
            <button
              className="btn btn-error w-full"
              onClick={onLogOut}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner" />
              ) : "Log out"}
            </button>
            <Link to="/" className="btn btn-ghost w-full">
              Stay signed in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}