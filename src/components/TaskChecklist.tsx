import React from 'react';

// Create a mapping of task keys to their descriptions
const taskDescriptions: { [key: string]: string } = {
  task1: "Wake up early and start your day with energy",
  task2: "Review and plan daily goals",
  task3: "Practice mindfulness or meditation",
  task4: "Do exercise or stretching routines",
  task5: "Eat a nutritious breakfast",
  task6: "Attend online classes or workshops",
  task7: "Work on assignments or tasks",
  task8: "Review and organize notes from the day",
  task9: "Participate in a study group or discussion",
  task10: "Take short breaks throughout the day",
  task11: "Read educational or self-improvement material",
  task12: "Prepare and plan for tomorrow's tasks",
};

interface TaskChecklistProps {
  tasks: { [key: string]: boolean };
  onTaskChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const TaskChecklist: React.FC<TaskChecklistProps> = ({ tasks, onTaskChange, onSubmit }) => {
  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>Tasks for Today</legend>
          {Object.keys(tasks).map((taskKey) => (
            <label key={taskKey}>
              <input
                type="checkbox"
                name={taskKey}
                checked={tasks[taskKey]}
                onChange={onTaskChange}
              />
              {taskDescriptions[taskKey]} {/* mapping for task descriptions */}
            </label>
          ))}
          <button type="submit">Submit Checklist</button>
        </fieldset>
      </form>
    </div>
  );
};

export default TaskChecklist;
