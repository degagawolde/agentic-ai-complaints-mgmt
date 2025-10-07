import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ComplaintForm from "./pages/ComplaintForm";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}> {/* full viewport height */}
        <Navigation /> {/* Sidebar */}
        <main style={{ flex: 1, background: "#f7fafc", padding: "1.5rem", overflow: "auto" }}>
          <Routes>
            <Route
              path="/"
              element={
                <h1 style={{ textAlign: "center", marginTop: "2.5rem", fontSize: "2rem" }}>
                  Welcome to the Complaint System
                </h1>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/complaint" element={<ComplaintForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
