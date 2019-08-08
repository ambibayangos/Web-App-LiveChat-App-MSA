import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form } from "semantic-ui-react";

class AddVideoForm extends Component {
  state = {};
  render() {
    return (
      <Form>
        <Form.Field>
          <label>{this.props.label}</label>
          <input placeholder={this.props.placeHolder} />
        </Form.Field>
      </Form>
    );
  }
}

export default AddVideoForm;
