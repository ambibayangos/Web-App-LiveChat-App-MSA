import React, { Component } from "react";
import "./chatBox.css";
import AddVideoForm from "../Form/form";

class ChatBox extends Component {
  state = {};
  render() {
    return (
      <div className="chatBox">
        <div className="messageBox">
          <AddVideoForm placeHolder={"Enter messages"} />
        </div>
      </div>
    );
  }
}

export default ChatBox;
