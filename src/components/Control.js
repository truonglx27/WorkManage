import React, { Component } from "react";
import { Row } from "reactstrap";
import Search from "./Search";
import Sort from "./Sort";

export default class Control extends Component {
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
  render() {
    // const { isOpen } = this.state;
    return (
      <div>
        <Row className="my-3">
          <Search onSearch={this.props.onSearch} />
          <Sort onSort={this.props.onSort} />
        </Row>
      </div>
    );
  }
}
