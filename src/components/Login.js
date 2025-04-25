
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// const Login = () => {
//   const [email, setEmail] = useState(""); 
//   const [password, setPassword] = useState(""); 
//   const navigate = useNavigate();
//   useEffect(() => {
//     const auth = localStorage.getItem("user");
//     if (auth) {
//       navigate("/"); 
//     }
//   }, [navigate]);

//   const handleLogin = async () => {
//     try {
//       const response = await fetch("http://localhost:5001/api/login", { // ✅ Corrected endpoint
//         method: "POST",
//         body: JSON.stringify({ email, password }),
//         headers: { "Content-Type": "application/json" },
//       });

//       const result = await response.json();
      
//       if (!response.ok) {
//         throw new Error(result.message || "Login failed");
//       }

//       // Store only necessary user info in localStorage
//       localStorage.setItem("user", JSON.stringify({ email: result.email }));

//       navigate("/DisplayData");

//     } catch (error) {
//       console.error("Login error:", error);
//       alert(error.message || "An error occurred during login. Please try again.");
//     }
//   };

//   return (
//     <div className="login"> 
//     <form className="loginfrom">
//     <h1 style={{ textAlign: "center" }}>Login Page</h1>

//       <input
//         type="text"
//         className="inputBox"
//         placeholder="Enter email"
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//       />
//       <input
//         type="password"
//         className="inputBox" 
//         placeholder="Enter password"
//         onChange={(e) => setPassword(e.target.value)}
//         value={password} 
//       />
//       <button onClick={handleLogin} className="appButton" type="button">
//         Login
//       </button>
//       </form>
//     </div>
//   );
// };

// export default Login;












import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/"); 
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify({ email: result.email }));

      navigate("/DisplayData");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Login Page</h1>
        <input
          type="email"
          className="input-box"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          type="password"
          className="input-box" 
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button onClick={handleLogin} className="login-button" type="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
