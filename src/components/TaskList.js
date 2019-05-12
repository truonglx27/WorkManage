import React, { Component } from "react";
import { Row, Table } from "reactstrap";
import { Input } from "reactstrap";
import TaskItem from "./TaskItem";
export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1
    };
  }
  onChange = event => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value
    });
  };
  render() {
    const { tasks, onUpdateStatus, onDeleteItem, onUpdateItem } = this.props;
    const { filterName, filterStatus } = this.state;
    let elmTasks = tasks.map((task, index) => {
      return (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onUpdateStatus={onUpdateStatus}
          onDeleteItem={onDeleteItem}
          onUpdateItem={onUpdateItem}
        />
      );
    });
    return (
      <Row>
        <Table hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Trạng thái</th>
              <th>Hoạt động</th>
            </tr>
            <tr>
              <td />
              <td>
                <Input
                  type="text"
                  name="filterName"
                  id="examplePassword"
                  placeholder="Tìm kiếm nhanh"
                  value={filterName}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <Input
                  type="select"
                  name="filterStatus"
                  id="exampleSelect"
                  value={filterStatus}
                  onChange={this.onChange}
                >
                  <option value={-1}>Tất cả</option>
                  <option value={0}>Ẩn</option>
                  <option value={1}>Kích hoạt</option>
                </Input>
              </td>
            </tr>
          </thead>
          {elmTasks}
        </Table>
      </Row>
    );
  }
}
