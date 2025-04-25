

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const auth = localStorage.getItem("user");
//     if (auth) {
//       navigate("/"); // If already logged in, navigate to home
//     }
//   }, [navigate]);

//   const collectData = async () => {
//     if (!name || !email || !password) {
//       alert("Please fill in all fields");
//       // return;
//     }

//     console.log("User Input:", { name, email, password });

//     try {
//       let response = await fetch("http://localhost:5001/api/user/createuser", {
//         method: "POST",
//         body: JSON.stringify({ name, email, password }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         // Check for specific error message from backend
//         if (errorData.message === "User already exists") {
//           alert("Email is already in use. Please try with a different email.");
//         } else {
//           throw new Error(errorData.message || "Failed to sign up");
//         }
//         return; // Stop further execution if error occurs
//       }

//       let result = await response.json();
//       console.log("Server Response:", result);

//       // Only proceed if the sign-up is successful
//       localStorage.setItem("user", JSON.stringify(result.result));
//       localStorage.setItem("token", JSON.stringify(result.auth));

//       // Navigate to the DisplayData page with the state
//       navigate("/DisplayData", { state: { name, email, password } });
//     } catch (error) {
//       console.error("Error while signing up:", error);
//       alert(error.message || "An error occurred while signing up. Please try again later.");
//     }
//   };

//   return (
//     <div className="register">
      
//       <h3>Register</h3>
      
      
//       <from className="signupfrom">
//         <input
//         className="inputBox"
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Enter Name"
//       />
//       <br />
//       <input
//         className="inputBox"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter Email"
//       />
//       <br />
//       <input
//         className="inputBox"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Enter Password"
//       />
//       <br />
//       <button onClick={collectData} className="appButton" type="button">
//         Sign Up
//       </button>
//       </from>
//     </div>
//   );
// };

// export default Signup;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css"; // Import the CSS file

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/"); // Redirect if already logged in
    }
  }, [navigate]);

  const collectData = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    console.log("User Input:", { name, email, password });

    try {
      let response = await fetch("http://localhost:5001/api/user/createuser", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "User already exists") {
          alert("Email is already in use. Please try a different email.");
        } else {
          throw new Error(errorData.message || "Failed to sign up");
        }
        return;
      }

      let result = await response.json();
      console.log("Server Response:", result);

      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));

      navigate("/DisplayData", { state: { name, email, password } });
    } catch (error) {
      console.error("Error while signing up:", error);
      alert(error.message || "An error occurred while signing up.");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form className="signupForm" onSubmit={collectData}>
        <input
          className="inputBox"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          required
        />
        <input
          className="inputBox"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
        />
        <input
          className="inputBox"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          required
        />
        <button className="appButton" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
