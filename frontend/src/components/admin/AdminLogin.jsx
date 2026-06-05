import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import Button from "../common/Button";
import Input from "../common/Input";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginAdmin } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await loginAdmin(username, password);
      if (success) {
        navigate("/admin");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12 animate-slide-in">
          <h1 className="text-4xl font-serif font-bold text-white mb-2">
            ORLEVE
          </h1>
          <p className="text-gray-400">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-xl animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              type="text"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />

            <Input
              label="Password"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500 rounded text-red-400 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

        </div>

        {/* Back to Website */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-accent-400 hover:text-accent-300 text-sm transition"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
