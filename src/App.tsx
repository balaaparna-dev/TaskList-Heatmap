import React, { Component } from 'react';
import TaskChecklist from './components/TaskChecklist';
import Heatmap from './components/Heatmap';
import { getDaysInMonth, getMonthName, getYearRange } from './Utils/dateUtils';
import './App.css';

interface State {
  tasks: { [key: string]: boolean };
  submitted: boolean;
  dayCompletion: { [key: number]: number };
  selectedDay: number | null;
  currentMonth: number; // 1-12
  currentYear: number;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    const currentDate = new Date();
    this.state = {
      tasks: { task1: false, task2: false, task3: false, task4: false, task5: false, task6: false, task7: false, task8: false, task9: false, task10: false, task11: false, task12: false },
      submitted: false,
      dayCompletion: {},
      selectedDay: null,
      currentMonth: currentDate.getMonth() + 1, // Get current month (1-12)
      currentYear: currentDate.getFullYear(),
    };
  }

  handleBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    this.setState((prevState) => ({
      tasks: { ...prevState.tasks, [name]: checked },
    }));
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { tasks, selectedDay } = this.state;
    const completedTasks = Object.values(tasks).filter(Boolean).length;
    const totalTasks = Object.keys(tasks).length;
    const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

    if (selectedDay !== null) {
      this.setState((prevState) => ({
        dayCompletion: {
          ...prevState.dayCompletion,
          [selectedDay]: completionPercentage,
        },
        submitted: true,
      }));
    }
  };

  // handleMonthChange = (increment: boolean) => {
  //   this.setState((prevState) => {
  //     const newMonth = increment
  //       ? prevState.currentMonth === 12
  //         ? 1
  //         : prevState.currentMonth + 1
  //       : prevState.currentMonth === 1
  //       ? 12
  //       : prevState.currentMonth - 1;
  //     return { currentMonth: newMonth };
  //   });
  // };

  render() {
    const { tasks, submitted, dayCompletion, selectedDay, currentMonth, currentYear } = this.state;
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const monthName = getMonthName(currentMonth);

    return (
      <>
        <h2>Daily Productivity Checklist</h2>
        <div className="app-container">
          <div className="content-container">
            {/* Task Checklist */}
            <TaskChecklist
              tasks={tasks}
              onTaskChange={this.handleBoxChange}
              onSubmit={this.handleSubmit}
            />

            {/* Calendar & Heatmap */}
            <div className="calendar-container">
              <div className="calendar-header">
                {/* <button className = "btn" onClick={() => this.handleMonthChange(false)}>&lt; Prev</button> */}
                <h3>{monthName} {currentYear}</h3>
                {/* <button className = "btn" onClick={() => this.handleMonthChange(true)}>Next &gt;</button> */}
              </div>
              <Heatmap
                daysInMonth={daysInMonth}
                dayCompletion={dayCompletion}
                selectedDay={selectedDay}
                onDaySelect={(day) => this.setState({ selectedDay: day })}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
