import React, { Component } from "react";
import "./chatBox.css";
import "semantic-ui-css/semantic.min.css";
import { Form } from "semantic-ui-react";

class ChatBox extends Component {
  state = { message: "", messageList: [] };

  onSubmitHandler = event => {
    document.getElementById("message").reset();
    this.setState({
      message: "",
      messageList: [...this.state.messageList, this.state.message]
    });
  };

  render() {
    return (
      <div className="chatBox">
        <div>
          {this.state.messageList.slice(-17).map(message => (
            <ul style={{ color: "white" }}>
              <h3 style={{ fontSize: "1.2rem" }}>User Name: </h3>
              {message}
            </ul>
          ))}
        </div>

        <div style={{ bottom: "0", position: "absolute", width: "100%" }}>
          <Form id="message" onSubmit={this.onSubmitHandler} autoComplete="off">
            <Form.Field>
              <input
                type="text"
                placeholder="Enter a message...."
                name="Inital Message"
                onChange={event =>
                  this.setState({ message: event.target.value })
                }
              />
            </Form.Field>
          </Form>
        </div>
      </div>
    );
  }
}

export default ChatBox;
