import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/home" />} />

        
        <Route path="/home" element={<Home />} />

        
        <Route path="/home/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
