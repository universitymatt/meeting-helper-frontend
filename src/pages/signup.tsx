import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../api/users";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    signUp({
      name: firstName,
      username: username,
      password: password,
    })
      .then(() => navigate("/"))
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.error("Bad Request:", error.response.data.detail);
          setError("Username already taken");
        } else {
          console.error("Other error:", error);
          setError("An unexpected error occurred");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl ring ring-blue-700">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <p className="text-sm mb-6">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign in
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-lg font-medium mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
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
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
