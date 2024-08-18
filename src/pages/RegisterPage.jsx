import { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState(""); // Fixed typo: setUserame to setUsername
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    const response = await fetch("https://blog-application-backend-9vrl.onrender.com/register", { // Updated URL
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    
    if (response.status === 200) {
      alert("Registration successful");
    } else {
      alert("Registration failed.");
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Fixed typo here
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
};

export default RegisterPage;
