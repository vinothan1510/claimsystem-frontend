
import { useState } from "react";

import { useAuth } from "../../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginApi({email, password });

      login(res.data.token, res.data.role);
      
      localStorage.setItem("userId", res.data.userId);
      if (res.data.role === "USER") navigate("/user/dashboard");
      else navigate("/officer/claims");
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Login</h4>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">Login</button>
          
        </form>

        <div className="text-center"><small>New user?{" "} <Link to="/register" className="text-decorative-none">Register here</Link></small></div>
      </div>
    </div>
  );
};

export default Login;