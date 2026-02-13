import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createTask, updateTask, deleteTask } from "../../services/taskApi";
import { formSuccess } from "../../utils/alert";
import TaskCategorySelect from "../../components/TaskCategorySelect/TaskCategorySelect";
import OSMLocationInput from "../../components/OSMLocationInput";
import "./Tasks.css";

function PostTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingTask = location.state?.task;

  /* =========================
     FORM STATE
  ========================= */
  const [form, setForm] = useState({
    title: editingTask?.title || "",
    description: editingTask?.description || "",
    category: editingTask?.category || "",
    priority: editingTask?.priority || "MEDIUM",

    fromLocation: editingTask?.fromLocation || "",
    toLocation: editingTask?.toLocation || "",

    minBudget: editingTask?.minBudget || "",
    maxBudget: editingTask?.maxBudget || "",

    startDate: editingTask?.startDate || "",
    endDate: editingTask?.endDate || "",

    details: {
      completionTime: editingTask?.details?.completionTime || "",
    },
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSameDay =
    form.startDate && form.endDate && form.startDate === form.endDate;

  /* =========================
     VALIDATION
  ========================= */
  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    if (!form.description.trim()) return "Description is required";
    if (!form.category) return "Category is required";
    if (!form.priority) return "Priority is required";
    if (!form.toLocation) return "To location is mandatory";

    if (!form.minBudget || !form.maxBudget) return "Min & Max budget required";

    if (+form.minBudget > +form.maxBudget)
      return "Min budget cannot exceed Max budget";

    if (!form.startDate || !form.endDate) return "Start & End date required";

    if (isSameDay && !form.details.completionTime)
      return "Completion time required for same-day task";

    return null;
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    try {
      setLoading(true);

      const payload = {
        ...form,
        minBudget: Number(form.minBudget),
        maxBudget: Number(form.maxBudget),
      };

      if (editingTask) {
        await updateTask(editingTask.id, payload);
        formSuccess("Task updated successfully ✨");
      } else {
        await createTask(payload);
        formSuccess("Your task has been posted 🚀");
      }

      navigate("/tasks/me");
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;

    try {
      setLoading(true);
      await deleteTask(editingTask.id);
      formSuccess("Task deleted 🗑️");
      navigate("/tasks/me");
    } catch (e) {
      setError(e.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="with-navbar post-task-page">
      <div className="post-task-card">
        {/* HEADER */}
        <div className="post-task-header">
          <div>
            <h2 className="post-task-title">
              {editingTask ? "Edit Task" : "Post Your Need"}
            </h2>
            <p className="post-task-subtitle">
              {editingTask
                ? "Update your task details"
                : "Tell us what you need — we’ll find help"}
            </p>
          </div>

          <button
            className="my-tasks-btn"
            onClick={() => navigate("/tasks/me")}
          >
            View My Tasks
          </button>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* TITLE + CATEGORY */}
          <div className="form-row">
            <div className="form-col">
              <label>Title *</label>
              <input
                className="form-control"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="form-col">
              <label>Category *</label>
              <TaskCategorySelect
                value={form.category}
                onChange={(category) => setForm({ ...form, category })}
              />
            </div>
          </div>

          {/* DESCRIPTION + PRIORITY */}
          <div className="form-row">
            <div className="form-col">
              <label>Description *</label>
              <textarea
                rows="3"
                className="form-control"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="form-col">
              <label>Priority *</label>
              <select
                className="form-control"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>

          {/* BUDGET */}
          <div className="form-row">
            <div className="form-col">
              <label>Min Budget *</label>
              <input
                type="number"
                className="form-control"
                value={form.minBudget}
                onChange={(e) =>
                  setForm({ ...form, minBudget: e.target.value })
                }
              />
            </div>

            <div className="form-col">
              <label>Max Budget *</label>
              <input
                type="number"
                className="form-control"
                value={form.maxBudget}
                onChange={(e) =>
                  setForm({ ...form, maxBudget: e.target.value })
                }
              />
            </div>
          </div>

          {/* LOCATION */}
          <div className="form-row">
            <div className="form-col">
              <label>From (optional)</label>
              <OSMLocationInput
                value={form.fromLocation}
                onChange={(loc) => setForm({ ...form, fromLocation: loc })}
              />
            </div>

            <div className="form-col">
              <label>To *</label>
              <OSMLocationInput
                value={form.toLocation}
                onChange={(loc) => setForm({ ...form, toLocation: loc })}
              />
            </div>
          </div>

          {/* DATES */}
          <div className="form-row">
            <div className="form-col">
              <label>Start Date *</label>
              <input
                type="date"
                className="form-control"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
              />
            </div>

            <div className="form-col">
              <label>End Date *</label>
              <input
                type="date"
                className="form-control"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>

          {/* SAME DAY */}
          {isSameDay && (
            <div className="form-row">
              <div className="form-col">
                <label>Completion Time *</label>
                <input
                  type="time"
                  className="form-control"
                  value={form.details.completionTime}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      details: {
                        completionTime: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* ACTIONS */}
          <div className="form-actions">
            <button type="submit" className="post-task-btn" disabled={loading}>
              {editingTask ? "Update Task" : "Post Task"}
            </button>

            {editingTask && (
              <button
                type="button"
                className="delete-btn"
                onClick={handleDelete}
                disabled={loading}
              >
                Delete Task
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostTask;
