import React, { Component } from "react";
import { Badge, Button } from "reactstrap";

export default class TaskItem extends Component {
  onUpdateStatus = () => {
    // bên này sẽ có prop của cha gửi sang là onUpdateStatus

    this.props.onUpdateStatus(this.props.task);
  };

  onDeleteItem = () => {
    this.props.onDeleteItem(this.props.task);
  };
  onUpdateItem = () => {
    this.props.onUpdateItem(this.props.task);
  };
  render() {
    let { task, index } = this.props;
    return (
      <tbody>
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{task.name}</td>
          <td onClick={this.onUpdateStatus} className="status">
            {task.status && (
              <h6>
                <Badge color="danger">Kích hoạt</Badge>
              </h6>
            )}
            {task.status === false && (
              <h6>
                <Badge color="info">Ẩn</Badge>
              </h6>
            )}
          </td>
          <td>
            <Button color="danger" className="mr-1" onClick={this.onDeleteItem}>
              Xóa
            </Button>
            <Button color="warning" onClick={this.onUpdateItem}>
              Sửa
            </Button>
          </td>
        </tr>
      </tbody>
    );
  }
}
