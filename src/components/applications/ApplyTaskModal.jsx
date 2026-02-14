import { useState } from "react";
import { applyForTask } from "../../services/applicationApi";
import "./ApplyTaskModal.css";

function ApplyTaskModal({ task, onClose, onSuccess }) {
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!bidAmount) {
      alert("Please enter bid amount");
      return;
    }

    if (task.maxBudget && Number(bidAmount) > Number(task.maxBudget)) {
      alert(`Bid amount cannot exceed task budget ₹${task.maxBudget}`);
      return;
    }

    try {
      setLoading(true);

      await applyForTask(task.id, {
        bidAmount,
        message,
      });

      alert("Applied successfully");
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-modal-overlay">
      <div className="apply-modal">
        <h3>Apply for "{task.title}"</h3>

        <label>Bid Amount</label>
        <input
          type="number"
          placeholder={
            task.maxBudget
              ? `Enter your bid (≤ ₹${task.maxBudget})`
              : "Enter your bid"
          }
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />

        <label>Message</label>
        <textarea
          placeholder="Message to task owner"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="modal-actions">
          <button
            className="submit-btn"
            onClick={handleApply}
            disabled={loading}
          >
            {loading ? "Applying..." : "Submit"}
          </button>

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyTaskModal;
