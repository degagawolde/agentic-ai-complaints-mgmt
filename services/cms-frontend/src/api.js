import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:8000", // change to your backend URL
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const registerUser = (data) => API.post("/auth/register/", data);
export const loginUser = (data) => API.post("/auth/login/", data);

// Complaint endpoints
export const submitComplaint = (data) => API.post("/cms/complaint/submissions/", data);
export const getComplaints = () => API.get("/cms/complaint/submissions/");



// Download supporting document
export const downloadSupportingDocument = async (complaintId) => {
  try {
    const response = await API.get(
      `/cms/complaint/submissions/${complaintId}/download/`,
      { responseType: "blob" } // important for file download
    );

    // Extract filename from headers, fallback to "file"
    let fileName = "file";
    const contentDisposition = response.headers["content-disposition"];
    if (contentDisposition) {
      const fileMatch = contentDisposition.match(/filename\*?=['"]?(?:UTF-8'')?(.+?)(['";]|$)/i);
      if (fileMatch && fileMatch[1]) {
        fileName = decodeURIComponent(fileMatch[1]);
      }
    }

    // Create a link to download
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download file:", error);
    alert("Failed to download the file. Please try again.");
  }
};
