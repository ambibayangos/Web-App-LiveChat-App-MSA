import React, { Component } from "react";
import "./chatBox.css";
import "semantic-ui-css/semantic.min.css";
import { Form } from "semantic-ui-react";
import * as signalR from "@aspnet/signalr";

//import { HubConnection } from "@aspnet/signalr-client";

class ChatBox extends Component {
  state = { message: "", messageList: [], hubConnection: null };

  onSubmitHandler = event => {
    document.getElementById("message").reset();
    this.setState({
      message: "",
      messageList: [...this.state.messageList, this.state.message]
    });
  };

  componentDidMount = () => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44314/ChatHub")
      .build();

    this.setState({ hubConnection }, () => {
      this.state.hubConnection
        .start()
        .then(() => console.log("Connection started!"))
        .catch(err => console.log("Error while establishing connection :("));
    });
  };

  render() {
    return (
      <div className="chatBox">
        <div>
          {this.state.messageList.slice(-9).map(message => (
            <ul style={{ color: "white", fontSize: "1rem", padding: "10px" }}>
              <span style={{ fontSize: "1rem", color: "red" }}>
                {this.props.userName + " : "}
              </span>
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
