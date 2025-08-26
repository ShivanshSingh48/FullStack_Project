import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");      
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState(""); 
  const [successMsg, setSuccessMsg] = useState("");  

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    
    if (name === "password" || name === "confirmPassword") {
      if ((name === "confirmPassword" && formData.password !== value) ||
          (name === "password" && formData.confirmPassword !== "" && value !== formData.confirmPassword)) {
        setError("Passwords do not match!");
      } else {
        setError("");
      }
    }

    
    if (name === "phone") {
      if (value && !/^\d*$/.test(value)) setPhoneError("Phone number must contain digits only!");
      else if (value && value.length !== 10) setPhoneError("Phone number must be exactly 10 digits!");
      else setPhoneError("");
    }

   
    if (name === "email") {
      if (value && !/\S+@\S+\.\S+/.test(value)) setEmailError("Invalid email format (must contain @).");
      else setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

   
    if (!/^\d{10}$/.test(formData.phone)) { setPhoneError("Phone number must be exactly 10 digits!"); return; }
    if (!/\S+@\S+\.\S+/.test(formData.email)) { setEmailError("Invalid email format."); return; }
    if (formData.password !== formData.confirmPassword) { setError("Passwords do not match!"); return; }

    const requestBody = {
      username: formData.username,
      email: formData.email,
      phonenumber: "+91" + formData.phone,
      city: formData.city,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:8085/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

    
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text); 
      } catch {
        data = { message: text }; 
      }

      if (response.ok) {
        setSuccessMsg(data.message || "Registration successful!");
        setServerError("");
        setFormData({ username: "", email: "", phone: "", city: "", password: "", confirmPassword: "" });
        setError(""); setPhoneError(""); setEmailError("");

       
        setTimeout(() => navigate("/home"), 2500);

      } else {
        if (data.message === "Email already registered!") {
          alert("⚠️ " + data.message); 
          navigate("/home");
        } else {
          setServerError(data.message || "Registration failed. Please try again.");
        }
      }

    } catch (err) {
      console.error("Error:", err);
      setServerError("Error connecting to server.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registration</h2>
      {successMsg && <p style={{ ...styles.error, color: "green" }}>{successMsg}</p>}
      {serverError && <p style={styles.error}>{serverError}</p>}

      <form style={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} style={styles.input} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} required />
        {emailError && <p style={styles.error}>{emailError}</p>}

        <div style={styles.phoneWrapper}>
          <span style={styles.phonePrefix}>+91</span>
          <input type="tel" name="phone" placeholder="10-digit number" value={formData.phone} onChange={handleChange} style={{ ...styles.input, flex: 1, borderLeft: "none" }} required />
        </div>
        {phoneError && <p style={styles.error}>{phoneError}</p>}

        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={styles.input} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} style={styles.input} required />
        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "400px", maxWidth: "90%", margin: "60px auto", padding: "30px 25px",
    border: "1px solid #e0e0e0", borderRadius: "12px", textAlign: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)", backgroundColor: "rgba(255, 255, 255, 1)", fontFamily: "Arial, sans-serif",
  },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "12px 14px", fontSize: "15px", borderRadius: "8px", border: "1px solid #ccc", transition: "all 0.3s ease" },
  phoneWrapper: { display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" },
  phonePrefix: { padding: "12px 14px", background: "#f5f5f5", borderRight: "1px solid #ccc", fontWeight: "bold" },
  button: { padding: "14px", fontSize: "16px", fontWeight: "bold", background: "linear-gradient(90deg, #4CAF50, #45a049)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease" },
  error: { color: "red", fontSize: "14px", marginTop: "-8px", marginBottom: "5px", textAlign: "left" },
};

export default Register;
