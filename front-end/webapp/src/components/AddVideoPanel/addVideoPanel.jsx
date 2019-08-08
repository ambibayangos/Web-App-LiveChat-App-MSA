import React, { Component } from "react";
import "./addVideoPanel.css";
import AddVideoForm from "../Form/form";

class AddVideoPanel extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <AddVideoForm label={"YouTubeLink"} placeHolder={"Enter link here"} />
        <AddVideoForm
          label={"Player one"}
          placeHolder={"Enter player one name"}
        />
        <AddVideoForm
          label={"Player two"}
          placeHolder={"Enter playe two name"}
        />
      </div>
    );
  }
}

export default AddVideoPanel;
