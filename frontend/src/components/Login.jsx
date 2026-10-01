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
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-200/70 border border-base-300 shadow-2xl rounded-3xl backdrop-blur-md">
        <div className="card-body p-8">
          <div className="text-center">
            <span className="text-5xl inline-block mb-2">👩‍💻</span>
            <h1 className="card-title justify-center text-3xl font-extrabold tracking-tight">Welcome Back</h1>
            <p className="text-sm text-base-content/70 mt-1">Sign in to your DevTinder account</p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="you@domain.com"
                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {message && (
              <div className="alert alert-info text-sm rounded-xl">
                <span>{message}</span>
              </div>
            )}

            <button className="btn btn-primary w-full rounded-xl font-bold shadow-md shadow-primary/20 mt-2" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="loading loading-spinner" />
              ) : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-base-content/80">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}