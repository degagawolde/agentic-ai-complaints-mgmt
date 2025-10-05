import { useState } from "react";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    product_or_service: "",
    date_of_incident: "",
    order_or_invoice_number: "",
    description: "",
    actions_already_taken: "",
    location: "",
    staff_involved: "",
    desired_outcome: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Complaint submitted successfully!");
  };

  const inputStyle = {
    width: "100%",
    border: "1.5px solid #ccc",
    padding: "10px",
    borderRadius: "6px",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontSize: "14px",
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "900px",
        margin: "3rem auto",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
      }}
    >
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          textAlign: "center",
          color: "#1f2937",
        }}
      >
        Submit a Complaint
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
        {/* Row 1 */}
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>Product/Service</label>
            <input
              type="text"
              name="product_or_service"
              value={formData.product_or_service}
              onChange={handleChange}
              placeholder="Enter product or service"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>Incident Date</label>
            <input
              type="date"
              name="date_of_incident"
              value={formData.date_of_incident}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>Order/Invoice Number</label>
            <input
              type="text"
              name="order_or_invoice_number"
              value={formData.order_or_invoice_number}
              onChange={handleChange}
              placeholder="Optional"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your issue in detail..."
              required
              style={{ ...inputStyle, resize: "none" }}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>Previous Actions Taken</label>
            <textarea
              name="actions_already_taken"
              rows="4"
              value={formData.actions_already_taken}
              onChange={handleChange}
              placeholder="Mention any steps already taken..."
              style={{ ...inputStyle, resize: "none" }}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>Staff Involved</label>
            <input
              type="text"
              name="staff_involved"
              value={formData.staff_involved}
              onChange={handleChange}
              placeholder="Names if any"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>Desired Outcome</label>
            <input
              type="text"
              name="desired_outcome"
              value={formData.desired_outcome}
              onChange={handleChange}
              placeholder="What resolution do you expect?"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
        </div>

        {/* Row 4 */}
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>Upload Evidence/File</label>
          <input type="file" name="file" onChange={handleChange} style={{ width: "100%" }} />
        </div>

        {/* Submit Button */}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            type="submit"
            style={{
              width: "200px",
              backgroundColor: "#16a34a",
              color: "white",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background-color 0.3s ease",
              border: "none",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#16a34a")}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;
