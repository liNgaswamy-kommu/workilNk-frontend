import { useNavigate } from "react-router-dom";
import "./TaskDetailsPanel.css";

function TaskDetailsPanel({ task }) {
  const navigate = useNavigate();

  if (!task) {
    return <div className="details-empty">-- No tasks are available --</div>;
  }

  return (
    <div className="details-card">
      {/* HEADER */}
      <div className="details-header">
        <h2 className="details-title">{task.title}</h2>

        {task.status === "POSTED" && (
          <button
            className="edit-btn"
            onClick={() => navigate("/post-task", { state: { task } })}
          >
            ✏️ Edit
          </button>
        )}
      </div>

      <div className="task-category">{task.category}</div>

      {/* STATUS */}
      <div className="task-status-bar">
        <span
          className={`status-pill ${task.status === "POSTED" ? "active" : ""}`}
        >
          Posted
        </span>
        <span
          className={`status-pill ${task.status === "ACCEPTED" ? "active" : ""}`}
        >
          Accepted
        </span>
        <span
          className={`status-pill ${task.status === "COMPLETED" ? "active" : ""}`}
        >
          Completed
        </span>
      </div>

      {/* DESCRIPTION */}
      <div className="task-description">{task.description}</div>

      {/* META */}
      <div className="task-meta">
        <div>
          <label>Budget</label>₹ {task.budget}
        </div>
        <div>
          <label>Start Date</label>
          {task.startDate}
        </div>
        <div>
          <label>End Date</label>
          {task.endDate}
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsPanel;
