import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/home/register");  
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> Welcome to the Home Page </h1>
        <p>Home Page of this Web Application</p>

        <button
          onClick={goToRegister}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginTop: "20px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          ➕ Want to Register? Click Here!
        </button>
      </header>
    </div>
  );
}

export default Home;
