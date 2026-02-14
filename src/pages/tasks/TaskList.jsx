import { useEffect, useState } from "react";
import { getOpenTasks } from "../../services/taskApi";
import {
  hasAppliedForTask
} from "../../services/applicationApi";
import ApplyTaskModal from "../../components/applications/ApplyTaskModal";
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // APPLY MODAL STATES
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // 🔥 TRACK APPLIED TASKS
  const [appliedTaskIds, setAppliedTaskIds] = useState(new Set());

  // ================= LOAD TASKS =================
  useEffect(() => {
    getOpenTasks()
      .then((res) => setTasks(res))
      .catch((err) => console.error("Error loading tasks", err))
      .finally(() => setLoading(false));
  }, []);

  // ================= CHECK ALREADY APPLIED =================
  useEffect(() => {
    if (tasks.length === 0) return;

    const checkAppliedTasks = async () => {
      const appliedSet = new Set();

      for (const task of tasks) {
        try {
          const applied = await hasAppliedForTask(task.id);
          if (applied === true) {
            appliedSet.add(task.id);
          }
        } catch (err) {
          console.error("Error checking applied status", err);
        }
      }

      setAppliedTaskIds(appliedSet);
    };

    checkAppliedTasks();
  }, [tasks]);

  if (loading) {
    return <div className="task-page">Loading tasks...</div>;
  }

  return (
    <div className="task-page">
      <h2 className="task-title">Available Tasks</h2>

      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks available</p>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => {
            const alreadyApplied = appliedTaskIds.has(task.id);

            return (
              <div className="task-card" key={task.id}>
                {/* HEADER */}
                <div className="task-card-header">
                  <div>
                    <h3>{task.title}</h3>
                    <div className="task-category-text">
                      {task.category}
                    </div>
                  </div>

                  {/* PRIORITY */}
                  <span
                    className={`priority-badge ${task.priority?.toLowerCase()}`}
                  >
                    {{
                      HIGH: "🔥 HIGH",
                      MEDIUM: "MEDIUM",
                      LOW: "LOW",
                    }[task.priority] || "MEDIUM"}
                  </span>
                </div>

                {/* BODY */}
                <div className="task-info">
                  <p><span>📍</span>{task.toLocation || "Not specified"}</p>
                  <p><span>💰</span>₹{task.maxBudget || "Negotiable"}</p>
                  <p><span>📅</span>{task.startDate} → {task.endDate}</p>
                  <p className="posted-by">Posted by {task.postedByName}</p>
                </div>

                {/* ACTION */}
                {alreadyApplied ? (
                  <button className="apply-btn applied" disabled>
                    Applied 
                  </button>
                ) : (
                  <button
                    className="apply-btn"
                    onClick={() => {
                      setSelectedTask(task);
                      setShowApplyModal(true);
                    }}
                  >
                    Apply Now
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* APPLY MODAL */}
      {showApplyModal && selectedTask && (
        <ApplyTaskModal
          task={selectedTask}
          onClose={() => setShowApplyModal(false)}
          onSuccess={() => {
            // 🔥 INSTANT UI UPDATE
            setAppliedTaskIds(prev => {
              const updated = new Set(prev);
              updated.add(selectedTask.id);
              return updated;
            });
          }}
        />
      )}
    </div>
  );
}

export default TaskList;
