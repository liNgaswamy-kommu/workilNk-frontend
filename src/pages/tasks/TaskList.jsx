import { useEffect, useState } from "react";
import { getOpenTasks } from "../../services/taskApi";
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOpenTasks()
      .then((res) => {
        setTasks(res);
      })
      .catch((err) => {
        console.error("Error loading tasks", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="task-page">Loading tasks...</div>;
  }

  return (
    <div className="task-page">
      <h2>Available Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <h3>{task.title}</h3>

              <p><b>Category:</b> {task.category}</p>
              <p><b>Location:</b> {task.location}</p>
              <p><b>Budget:</b> ₹{task.budget}</p>

              <p>
                <b>Dates:</b> {task.startDate} → {task.endDate}
              </p>

              <p>
                <b>Posted by:</b> {task.postedByName}
              </p>

              <button className="apply-btn">Apply</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
