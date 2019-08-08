import React, { Component } from "react";

class AddVideoButton extends Component {
  state = {};
  render() {
    return (
      <div className="button" onClick={this.props.videoButtonClicked}>
        <i class="plus icon" />
        <span>Add Video</span>
      </div>
    );
  }
}

export default AddVideoButton;
