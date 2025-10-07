import { useState, useEffect } from "react";
import { getComplaints, downloadSupportingDocument } from "../api";
import "../styles/complaintList.css";

export default function ComplaintList() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await getComplaints();
                setComplaints(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load complaints.");
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    if (loading) return <p className="loading">Loading complaints...</p>;
    if (error) return <p className="error">{error}</p>;
    if (complaints.length === 0) return <p>No complaints submitted yet.</p>;

    return (
        <div className="complaint-list-container">
            <h2>Submitted Complaints</h2>
            <div className="complaint-grid">
                {complaints.map((complaint) => (
                    <div key={complaint.uu_id} className="complaint-card">
                        <h3>{complaint.product_or_service}</h3>
                        <p><strong>Date of Incident:</strong> {complaint.date_of_incident}</p>
                        <p><strong>Description:</strong> {complaint.description}</p>
                        <p><strong>Actions Taken:</strong> {complaint.actions_already_taken || "N/A"}</p>
                        <p><strong>Desired Outcome:</strong> {complaint.desired_outcome || "N/A"}</p>
                        <p><strong>Status:</strong> {complaint.complaint_status}</p>
                        <p><strong>Reference #:</strong> {complaint.reference_number}</p>
                        <button onClick={() => downloadSupportingDocument(complaint.uu_id)}>
                            Download File
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
}
