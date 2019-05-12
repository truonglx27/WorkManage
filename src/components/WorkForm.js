import React, { Component } from "react";
import { Alert } from "reactstrap";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";

import "./WorkForm.css";
export default class WorkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false
    };
  }

  onChange = event => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    this.props.onSubmit(this.state, this.props.task);
    this.onClear();
    this.props.onCloseForm();
  };
  onClear = () => {
    this.setState({
      name: "",
      status: false
    });
    this.props.onCloseForm();
  };

  componentWillMount() {
    console.log("componentWillMount");
    const { task } = this.props;
    if (task) {
      this.setState({
        id: task.id,
        name: task.name,
        status: task.status
      });
    }
    // console.log(this.state);
  }
  componentWillReceiveProps(nextProps) {
    // khi đang hiển thị thêm có thể sửa
    console.log(nextProps);
    if (nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    } else if (!nextProps.task) {
      this.setState({
        id: "",
        name: "",
        status: false
      });
    }
  }
  render() {
    const { onCloseForm } = this.props;
    const { id } = this.state;
    let add = "https://image.flaticon.com/icons/svg/189/189678.svg";
    return (
      <div>
        <Card>
          <CardTitle>
            <div className="addWord">
              <Alert color="danger" className="mb-0">
                {id !== "" ? "Cập nhât công việc" : "Thêm công việc"}
                <img src={add} width={18} height={20} onClick={onCloseForm} />
              </Alert>
            </div>
          </CardTitle>
          <CardBody>
            <CardText>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="exampleEmail">Tên công việc</Label>
                  <Input
                    type="text"
                    name="name"
                    id="exampleEmail"
                    placeholder="Nhập tên công việc"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Trạng thái</Label>
                  <Input
                    type="select"
                    name="status"
                    id="exampleSelect"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value={true}>Kích hoạt</option>
                    <option value={false}>Ân</option>
                  </Input>
                </FormGroup>
                <Button className="mr-2" type="submit">
                  Lưu lại
                </Button>
                <Button onClick={this.onClear}>Hủy bỏ</Button>
              </Form>
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}
