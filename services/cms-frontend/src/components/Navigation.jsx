import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav
      style={{
        backgroundColor: "#ffffffff",
        color: "#3c3a3aff",
        width: "16rem",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0.5rem"
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "2rem"
        }}
      >
        Customer CMS
      </h1>
      <Link
        to="/"
        style={{
          marginBottom: "1rem",
          textDecoration: "none",
          color: "#3c3a3aff",
        }}
        onMouseOver={e => (e.target.style.textDecoration = "underline")}
        onMouseOut={e => (e.target.style.textDecoration = "none")}
      >
        Home
      </Link>

      <Link
        to="/complaint"
        style={{
          marginBottom: "1rem",
          textDecoration: "none",
          color: "#3c3a3aff",
        }}
        onMouseOver={e => (e.target.style.textDecoration = "underline")}
        onMouseOut={e => (e.target.style.textDecoration = "none")}
      >
        Submit Complaint
      </Link>

      <Link
        to="/complaint-list"
        style={{
          marginBottom: "1rem",
          textDecoration: "none",
          color: "#3c3a3aff",
        }}
        onMouseOver={e => (e.target.style.textDecoration = "underline")}
        onMouseOut={e => (e.target.style.textDecoration = "none")}
      >
        List Complaint
      </Link>

      <Link
        to="/login"
        style={{
          marginBottom: "1rem",
          textDecoration: "none",
          color: "#3c3a3aff",
        }}
        onMouseOver={e => (e.target.style.textDecoration = "underline")}
        onMouseOut={e => (e.target.style.textDecoration = "none")}
      >
        Login
      </Link>
    </nav>
  );
};

export default Navigation;
