import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/header";
import AddVideoPanel from "./components/AddVideoPanel/addVideoPanel";
import BackDrop from "./components/BackDrop/backDrop";
import ChatBox from "./components/ChatBox/chatBox";
import GetUserName from "./components/GetUserName/getUserName";

class App extends Component {
  state = {
    addVideoButtonPressed: false,
    userIsReady: true,
    userName: "annonymous"
  };

  /*Events Handlers && Helper Functions*/

  addVideoButtonPressedHandler = () => {
    const tempVdeioButton = this.state.addVideoButtonPressed;
    this.setState({ addVideoButtonPressed: !tempVdeioButton });
  };

  closeGetUSerPanel = user => {
    const tempGetUserPanel = this.state.userIsReady;
    this.setState({ userIsReady: !tempGetUserPanel, userName: user });
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

  renderGetUserName() {
    let tempGetUserPanel;
    if (this.state.userIsReady) {
      tempGetUserPanel = (
        <GetUserName onSubmintEntered={this.closeGetUSerPanel} />
      );
    }
    return tempGetUserPanel;
  }

  render() {
    let { tempVideoPanel, tempBackDrop } = this.renderAddVideoPanel();
    let tempGetUserPanel = this.renderGetUserName();

    return (
      <div className="App" style={{ style: "100%" }}>
        {tempGetUserPanel}
        <Header onAddVideoClicked={this.addVideoButtonPressedHandler} />
        <ChatBox
          onMessageEntered={this.handleOnSubmit}
          userName={this.state.userName}
        />
        {tempVideoPanel}
        {tempBackDrop}
      </div>
    );
  }
}

export default App;
