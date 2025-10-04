import { useState } from "react";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.file) data.append("file", formData.file);

    console.log("Complaint submitted:", Object.fromEntries(data.entries()));
    alert("Complaint submitted successfully!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">Submit a Complaint</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Complaint Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <textarea
          name="description"
          placeholder="Describe your issue"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full border rounded p-2"
        ></textarea>
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
