import React, { Component } from "react";
import "./addVideoPanel.css";
import AddVideoForm from "../Form/form";

class AddVideoPanel extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <h3>Add Video</h3>
        <div className="space">
          <AddVideoForm label={"YouTubeLink"} placeHolder={"Enter link here"} />
        </div>
        <div className="space">
          <AddVideoForm
            label={"Player one"}
            placeHolder={"Enter player one name"}
          />
        </div>
        <div className="space">
          <AddVideoForm
            label={"Player two"}
            placeHolder={"Enter playe two name"}
          />
        </div>
        <div className="spacer" />
        <button
          className="ui negative basic button"
          onClick={this.props.onExitClick}
        >
          Cancel
        </button>
        <button
          className="ui positive basic button"
          style={{ margin: "10px  0px 0px 0px" }}
        >
          Save video
        </button>
      </div>
    );
  }
}

export default AddVideoPanel;
