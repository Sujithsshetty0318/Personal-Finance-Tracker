import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";
import "./Auth.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await signup(username, password, name);
      // After signup, require user to login explicitly
      navigate("/login");
    } catch (err) {
      setError(err.response ? err.response.data : "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-title">Personal- finance-tracker</div>
      <div className="auth-box">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
