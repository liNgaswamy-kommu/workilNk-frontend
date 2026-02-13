import { useEffect, useState } from "react";
import { getMyPostedTasks } from "../../services/taskApi";
import TaskListPanel from "./TaskListPanel";
import TaskDetailsPanel from "./TaskDetailsPanel";
import "./MyPostedTasks.css";

function MyPostedTasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getMyPostedTasks();
      setTasks(data);
      if (data.length > 0) setSelectedTask(data[0]);
    })();
  }, []);

  return (
    <div className="with-navbar mytasks-page">
      <div className="mytasks-card">

        {/* HEADER (like Naukri) */}
        <div className="mytasks-header">
          <h3 className="panel-title">My Tasks</h3>
        </div>

        {/* BODY */}
        <div className="mytasks-body">

          {/* LEFT */}
          <div className="mytasks-left">
            <TaskListPanel
              tasks={tasks}
              selectedTask={selectedTask}
              onSelect={setSelectedTask}
            />
          </div>

          {/* RIGHT */}
          <div className="mytasks-right">
            <TaskDetailsPanel task={selectedTask} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default MyPostedTasks;
