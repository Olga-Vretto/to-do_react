import React, { Component } from "react";
import "./Main.css";
import SectionTask from "../Tasks/SectionTask";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      taskList: [],
      taskId: 1,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        taskList: [
          ...prevState.taskList,
          { task: prevState.taskName, id: prevState.taskId, isDone: false },
        ],
        taskName: "",
        taskId: prevState.taskId + 1,
      };
    });
  }

  handleChange(event) {
    this.setState({ taskName: event.target.value });
  }

  toggleTask(taskId) {
    this.setState((prevState) => {
      const newTaskList = prevState.taskList.map((task) => {
        if (task.id === taskId) {
          task.isDone = !task.isDone;
        }
        return task;
      });
      return { taskList: newTaskList };
    });
  }

  deleteTask(taskId) {
    this.setState((prevState) => {
      const newArray = prevState.taskList.filter((task) => task.id !== taskId);
      return { taskList: newArray };
    });
  }

  render() {
    return (
      <main className="main">
        <SectionTask
          tasks={this.state.taskList}
          toggleTask={this.toggleTask}
          deleteTask={this.deleteTask}
        />

        <section className="section__add-task">
          <h2 className="main-subtitle">Add Task</h2>
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              value={this.state.taskName}
              type="text"
              onChange={this.handleChange}
              className="input"
              maxLength="45"
              placeholder="Write here new task."
            />
            <button type="submit" className="add-btn">
              Add task
            </button>
          </form>
        </section>
      </main>
    );
  }
}

export default Main;
