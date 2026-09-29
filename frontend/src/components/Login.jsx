import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setMessage("");
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      dispatch(addUser(data.user))
      navigate('/')
      setMessage(data.msg);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="text-center">
            <p className="text-4xl">👩‍💻</p>
            <h1 className="card-title justify-center text-3xl mt-2">Welcome back</h1>
            <p className="text-base-content/70 mt-1">Sign in to DevTinder</p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <label className="form-control w-full">
              <span className="label-text mb-1">Email</span>
              <input
                type="email"
                placeholder="you@dev.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Password</span>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {message && (
              <div className="alert alert-info text-sm">
                <span>{message}</span>
              </div>
            )}

            <button className="btn btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="loading loading-spinner" />
              ) : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            New here?{" "}
            <Link to="/signup" className="link link-primary">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}