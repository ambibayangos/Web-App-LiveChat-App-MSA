import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/header";
import AddVideoPanel from "./components/AddVideoPanel/addVideoPanel";
import BackDrop from "./components/BackDrop/backDrop";
import ChatBox from "./components/ChatBox/chatBox";

class App extends Component {
  state = {
    addVideoButtonPressed: false
  };

  /*Events Handlers && Helper Functions*/

  addVideoButtonPressedHandler = () => {
    const tempVdeioButton = this.state.addVideoButtonPressed;
    this.setState({ addVideoButtonPressed: !tempVdeioButton });
  };

  renderAddVideoPanel() {
    let tempVideoPanel;
    let tempBackDrop;
    if (this.state.addVideoButtonPressed) {
      tempVideoPanel = (
        <AddVideoPanel onExitClick={this.addVideoButtonPressedHandler} />
      );
      tempBackDrop = (
        <BackDrop onBackDropClicked={this.addVideoButtonPressedHandler} />
      );
    }
    return { tempVideoPanel, tempBackDrop };
  }

  render() {
    let { tempVideoPanel, tempBackDrop } = this.renderAddVideoPanel();

    return (
      <div className="App" style={{ style: "100%" }}>
        <Header onAddVideoClicked={this.addVideoButtonPressedHandler} />
        <ChatBox onMessageEntered={this.handleOnSubmit} />
        {tempVideoPanel}
        {tempBackDrop}
      </div>
    );
  }
}

export default App;
