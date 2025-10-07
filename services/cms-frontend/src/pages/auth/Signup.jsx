import { useState } from "react";
import { registerUser } from "../../api";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css"; // reuse the same CSS

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            navigate("/login");
        } catch {
            alert("Error during registration");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input name="username" placeholder="Username" onChange={handleChange} />
                    <input name="email" placeholder="Email" onChange={handleChange} />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button type="submit">Register</button>
                </form>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}
