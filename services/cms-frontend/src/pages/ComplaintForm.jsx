import { useState } from "react";
import { submitComplaint } from "../api";
import "../styles/ComplaintForm.css";

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await submitComplaint(data);
      setMessage({ text: "Complaint submitted successfully!", type: "success" });
      setFormData({
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
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.detail ||
          "❌ Failed to submit complaint. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 5000);
    }
  };

  return (
    <div className="complaint-card">
      <h2>Submit a Complaint</h2>

      {message.text && (
        <div className={message.type === "success" ? "message-success" : "message-error"}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Row 1 */}
        <div className="row">
          <div className="input-group">
            <label>Product/Service</label>
            <input
              type="text"
              name="product_or_service"
              value={formData.product_or_service}
              onChange={handleChange}
              required
              placeholder="Enter product or service"
            />
          </div>

          <div className="input-group">
            <label>Incident Date</label>
            <input
              type="date"
              name="date_of_incident"
              value={formData.date_of_incident}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Order/Invoice Number</label>
            <input
              type="text"
              name="order_or_invoice_number"
              value={formData.order_or_invoice_number}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="row">
          <div className="input-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your issue..."
              required
            />
          </div>

          <div className="input-group">
            <label>Previous Actions Taken</label>
            <textarea
              name="actions_already_taken"
              value={formData.actions_already_taken}
              onChange={handleChange}
              rows="4"
              placeholder="Mention any steps already taken..."
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="row">
          <div className="input-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
            />
          </div>

          <div className="input-group">
            <label>Staff Involved</label>
            <input
              type="text"
              name="staff_involved"
              value={formData.staff_involved}
              onChange={handleChange}
              placeholder="Names if any"
            />
          </div>

          <div className="input-group">
            <label>Desired Outcome</label>
            <input
              type="text"
              name="desired_outcome"
              value={formData.desired_outcome}
              onChange={handleChange}
              placeholder="What resolution do you expect?"
              required
            />
          </div>
        </div>

        {/* File input */}
        <div className="input-group file-input">
          <label>Upload Evidence/File</label>
          <input type="file" name="file" onChange={handleChange} />
        </div>

        {/* Submit button */}
        <div style={{ textAlign: "center" }}>
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;
