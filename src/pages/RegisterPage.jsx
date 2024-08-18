import { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState(""); // Fixed typo: setUserame to setUsername
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    try {
      const response = await fetch("https://blog-application-backend-9vrl.onrender.com/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
  
      if (response.ok) {
        alert("Registration successful");
      } else {
        const errorText = await response.text();
        alert(`Registration failed: ${errorText}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
