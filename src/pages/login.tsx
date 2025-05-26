import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../api/auth";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    console.log("Logging in with", username, password);
    setError("");
    signIn({
      username: username,
      password: password,
    })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.error("Bad Request:", error.response.data.detail);
          setError("Incorrect username or password");
        } else {
          console.error("Other error:", error);
          alert("An unexpected error occurred");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl ring ring-blue-700">
        <h1 className="text-3xl font-bold mb-4">Sign in</h1>
        <p className="text-sm mb-6">
          Don't have an account?{" "}
          <a href="/register/" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-lg font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-lg font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
