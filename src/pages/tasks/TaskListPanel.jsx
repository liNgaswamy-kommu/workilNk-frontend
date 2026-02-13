function TaskListPanel({ tasks, selectedTask, onSelect }) {
  return (
    <div className="task-scroll">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-item ${
            selectedTask?.id === task.id ? "active" : ""
          }`}
          onClick={() => onSelect(task)}
        >
          <h4 title={task.title}>{task.title}</h4>
          <div className="category">{task.category}</div>
          <div className="status">{task.status}</div>
        </div>
      ))}
    </div>
  );
}

export default TaskListPanel;
