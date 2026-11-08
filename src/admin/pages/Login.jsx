
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import api from "../../services/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/admin/login", form);

      const { token, admin } = response.data.data;

      localStorage.setItem("gs_admin_token", token);
      localStorage.setItem("gs_admin_data", JSON.stringify(admin));

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-background-glow login-glow-one"></div>
      <div className="login-background-glow login-glow-two"></div>

      <div className="admin-login-card">
        <div className="login-brand">
          <div className="login-brand-icon">
            <LockKeyhole size={25} />
          </div>

          <h1>GammaSoft<span>.</span></h1>
          <p>ADMINISTRATION PORTAL</p>
        </div>

        <div className="login-heading">
          <h2>Welcome Back</h2>
          <p>Sign in to manage your website content.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">Email Address</label>

            <div className="login-input-wrapper">
              <Mail size={18} />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>

            <div className="login-input-wrapper">
              <LockKeyhole size={18} />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="login-footer">
          <span>GammaSoft</span>
          <span>Secure Admin Access</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
