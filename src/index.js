import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container, Row, Button } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import WorkForm from "./components/WorkForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], // id, name, status
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1
      },
      keyword: "",
      sort: {
        by: "name",
        value: 1
      }
    };
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks
      });
    }
  }
  
  // onGenerateData = () => {
  //   // Tao db va luu
  //   console.log("Genarate");
  //   let tasks = [
  //     {
  //       id: this.generateID(),
  //       name: "Học lập trình",
  //       status: true
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "Đi kiếm ăn",
  //       status: false
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "Đi du lịch",
  //       status: true
  //     }
  //   ];
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // };

  s4() {
    // Ham tao id
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  generateID() {
    // hien thi id
    return this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4();
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm
      });
    }
  };

  onCloseForm = () => {
    // close Form
    this.setState({
      isDisplayForm: false
    });
  };
  onShowFrom = () => {
    this.setState({
      isDisplayForm: true
    });
  };

  onSubmit = (data, taskItem) => {
    // of WorkForm
    let { tasks } = this.state;
    if (data.id === "") {
      data.id = this.generateID();
      tasks.push(data);
    } else {
      let index = tasks.indexOf(taskItem);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // console.log(data);
  };

  onUpdateStatus = task => {
    const { tasks } = this.state;
    let index = tasks.indexOf(task);
    // console.log(index, task);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
    }
    //  let newTasks = [
    //   ...tasks.slice(0,index),
    //   {
    //     ...task,
    //     status:!status
    //   },
    //   ...tasks.slice(index+1)
    // ]
    // console.log(newTasks);
    this.setState({
      tasks: tasks
    });
    // console.log(this.state.tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onDeleteItem = task => {
    const { tasks } = this.state;
    let index = tasks.indexOf(task);
    // let task = tasks.splice(index,1);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        // tasks: [...tasks.slice(0, index), ...tasks.slice(index + 1)]
        tasks: tasks
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    this.onCloseForm();
  };

  onUpdateItem = task => {
    const { tasks } = this.state;
    let index = tasks.indexOf(task);
    var taskEditing = tasks[index];
    // console.log(taskEditing);
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowFrom();
  };

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  };
  onSearch = keyword => {
    this.setState({
      keyword: keyword
    });
  };
  onSort = (sortBy, sortValue) => {
    console.log(sortBy + "- " + sortValue);
    this.setState(state => {
      return {
        sort: {
          by: sortBy,
          value: sortValue
        }
      };
    });
    console.log(this.state.sort);
  };
  render() {
    let { tasks, isDisplayForm, taskEditing, filter, keyword } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter(task => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }
    if (keyword) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    let elmTaskForm = isDisplayForm ? (
      <WorkForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
      />
    ) : (
      ""
    );
    return (
      <div className="App">
        <Container>
          <div className="header">
            <h1>Quản lí công việc</h1>
          </div>
          <Row className="mt-3">
            <div className={elmTaskForm ? "col-sm-4 col-md-4" : ""}>
              {/* Form */}
              {elmTaskForm}
              {/* </Col> */}
            </div>
            <div
              className={
                elmTaskForm ? "col-md-8 col-sm-8" : "col-sm-12 col-md-12"
              }
            >
              <Button color="primary" onClick={this.onToggleForm}>
                Thêm công việc
              </Button>
              {/* <Button
                color="danger"
                className="ml-2"
                onClick={this.onGenerateData}
              >
                Generate data
              </Button> */}
              {/* Search -Sort */}
              <Control onSearch={this.onSearch} onSort={this.onSort} />
              {/* data-table */}
              <TaskList
                tasks={tasks}
                onUpdateStatus={this.onUpdateStatus}
                onDeleteItem={this.onDeleteItem}
                onUpdateItem={this.onUpdateItem}
                onFilter={this.onFilter}
              />
              {/* </Col> */}
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
