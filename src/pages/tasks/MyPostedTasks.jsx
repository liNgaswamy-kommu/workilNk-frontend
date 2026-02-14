import { useEffect, useState } from "react";
import { getMyPostedTasks } from "../../services/taskApi";
import { getApplicationsByTask } from "../../services/applicationApi";
import TaskListPanel from "./TaskListPanel";
import TaskDetailsPanel from "./TaskDetailsPanel";
import ApplicationsList from "../../components/applications/ApplicationsList";
import "./MyPostedTasks.css";

function MyPostedTasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const [activeTab, setActiveTab] = useState("POSTED");
  const [applications, setApplications] = useState([]);

  // LOAD MY TASKS
  useEffect(() => {
    (async () => {
      const data = await getMyPostedTasks();
      setTasks(data);
      if (data.length > 0) {
        setSelectedTask(data[0]);
      }
    })();
  }, []);

  // LOAD APPLICATIONS WHEN TASK CHANGES
  useEffect(() => {
    if (!selectedTask) return;

    (async () => {
      const res = await getApplicationsByTask(selectedTask.id);
      setApplications(res);

      // 🔥 AUTO TAB SWITCH
      if (res.length > 0) {
        setActiveTab("APPLIED");
      } else {
        setActiveTab("POSTED");
      }
    })();
  }, [selectedTask]);

  const handleAppliedClick = async () => {
    if (!selectedTask) return;

    const res = await getApplicationsByTask(selectedTask.id);
    setApplications(res);
    setActiveTab("APPLIED");
  };


  return (
    <div className="with-navbar mytasks-page">
      <div className="mytasks-card">
        <div className="mytasks-header">
          <h3 className="panel-title">My Tasks</h3>
        </div>

        <div className="mytasks-body">
          {/* LEFT PANEL */}
          <div className="mytasks-left">
            <TaskListPanel
              tasks={tasks}
              selectedTask={selectedTask}
              onSelect={(task) => {
                setSelectedTask(task);
                setActiveTab("POSTED");
              }}
            />
          </div>

          {/* RIGHT PANEL */}
          <div className="mytasks-right">
            <TaskDetailsPanel
              task={selectedTask}
              activeTab={activeTab}
              onAppliedClick={handleAppliedClick}
            />

            {activeTab === "APPLIED" && (
              <div className="applications-scroll">
                <ApplicationsList applications={applications} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPostedTasks;
