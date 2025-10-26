import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../App";
import "./Signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Starting login for:", email);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending request to backend...");

      const response = await fetch("http://localhost:8080/user/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", response.status);

      if (response.status === 400) {
        const msg = await response.text();
        throw new Error(msg);
      } else if (response.status === 401) {
        throw new Error("Invalid email or password");
      } else if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Server error");
      }

      const userData = await response.json();
      console.log("Login successful, received user data:", userData);

      // Save in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      login(userData);

      // Redirect based on role
      const role = userData.role.toLowerCase();
      if (role === "admin") {
        console.log("Redirecting to admin-land");
        history.push("/admin-land");
      } else if (role === "vendor") {
        console.log("Redirecting to vendor-land");
        history.push("/vendor-land");
      } else {
        console.log("Redirecting to user-land");
        history.push("/user-land");
      }

    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      console.log("Login process finished");
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default Signin;
