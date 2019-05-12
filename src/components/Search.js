import React, { Component } from "react";
import { Col } from "reactstrap";
import { Input, InputGroup, InputGroupAddon, Button } from "reactstrap";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    };
  }
  onChange = event => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  };
  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  };
  render() {
    const { keyword } = this.state;
    return (
      <Col sm="6" md="6">
        <InputGroup>
          <Input
            placeholder="Nhập từ khóa..."
            value={keyword}
            name="keyword"
            onChange={this.onChange}
          />
          <button className="btn btn-primary" onClick={this.onSearch}>
            @Tìm
          </button>
        </InputGroup>
      </Col>
    );
  }
}
