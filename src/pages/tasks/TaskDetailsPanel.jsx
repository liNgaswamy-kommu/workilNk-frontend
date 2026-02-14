import { useNavigate } from "react-router-dom";
import "./TaskDetailsPanel.css";

function TaskDetailsPanel({ task, activeTab, onAppliedClick }) {
  const navigate = useNavigate();

  if (!task) {
    return <div className="details-empty">-- No tasks are available --</div>;
  }

  return (
    <div className="details-card">

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

      {/* STATUS PILLS */}
      <div className="task-status-bar">

        <span
          className={`status-pill ${
            activeTab === "POSTED" ? "active posted" : ""
          }`}
        >
          Posted
        </span>

        <span
          className={`status-pill ${
            activeTab === "APPLIED" ? "active applied" : ""
          }`}
          onClick={onAppliedClick}
          style={{ cursor: "pointer" }}
        >
          Applied
        </span>

        <span
          className={`status-pill ${
            task.status === "ACCEPTED" ? "active accepted" : ""
          }`}
        >
          Accepted
        </span>

        <span
          className={`status-pill ${
            task.status === "COMPLETED" ? "active completed" : ""
          }`}
        >
          Completed
        </span>
      </div>

      <div className="task-description">{task.description}</div>

      <div className="task-meta">
        <div>
          <label>Budget</label>
          {task.minBudget === task.maxBudget ? (
            <>₹ {task.minBudget}</>
          ) : (
            <>₹ {task.minBudget} – {task.maxBudget}</>
          )}
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
