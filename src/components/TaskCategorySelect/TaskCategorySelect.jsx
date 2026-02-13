import Select from "react-select";
import { TASK_CATEGORY_OPTIONS } from "../../constants/taskCategories";

function TaskCategorySelect({ value, onChange }) {
  return (
    <Select
      options={TASK_CATEGORY_OPTIONS}
      value={TASK_CATEGORY_OPTIONS.find(opt => opt.value === value)}
      onChange={(selected) => onChange(selected.value)}
      placeholder="Select task category"
    />
  );
}

export default TaskCategorySelect;
