import { useState } from "react";
import { Link } from "react-router";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function onSignUp(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setMessage("");
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
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
            <h1 className="card-title justify-center text-3xl mt-2">Join DevTinder</h1>
            <p className="text-base-content/70 mt-1">Find developers worth matching with</p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={onSignUp}>
            <label className="form-control w-full">
              <span className="label-text mb-1">Name</span>
              <input
                type="text"
                placeholder="Ada Lovelace"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

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
                placeholder="Strong password"
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
              ) : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}