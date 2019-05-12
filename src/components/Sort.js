import React, { Component } from "react";
import { Col } from "reactstrap";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class Sort extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  onClick = (sortBy, sortValue) => {
    this.props.onSort(sortBy, sortValue);
  };
  render() {
    // const { sort } = this.state;
    return (
      <Col sm="6" md="6">
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret color="primary">
            Sắp xếp
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              // className={
              //   sort.by === "name" && sort.value === 1 ? "sort-selected" : ""
              // }
              onClick={() => this.onClick("name", 1)}
            >
              A->Z
            </DropdownItem>
            <DropdownItem
              // className={
              //   sort.by === "name" && sort.value === -1 ? "sort-selected" : ""
              // }
              onClick={() => this.onClick("name", -1)}
            >
              Z->A
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              // className={
              //   sort.by === "status" && sort.value === 1 ? "sort-selected" : ""
              // }
              onClick={() => this.onClick("status", 1)}
            >
              Trạng thái kích hoạt
            </DropdownItem>
            <DropdownItem
              // className={
              //   sort.by === "status" && sort.value === -1 ? "sort-selected" : ""
              // }
              onClick={() => this.onClick("status", -1)}
            >
              Trạng thái ẩn
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </Col>
    );
  }
}
