import { useState } from "react";
import { applyForTask } from "../../services/applicationApi";
import "../../pages/tasks/TaskList.css";

function ApplyTaskModal({ task, onClose, onApplied }) {
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);
      await applyForTask(task.id, { bidAmount, message });
      onApplied();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Apply failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Apply for Task</h3>

        <input
          type="number"
          placeholder="Bid Amount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button onClick={handleApply} disabled={loading}>
            {loading ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyTaskModal;
