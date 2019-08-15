import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/header";
import AddVideoPanel from "./components/AddVideoPanel/addVideoPanel";
import BackDrop from "./components/BackDrop/backDrop";
import ChatBox from "./components/ChatBox/chatBox";
import GetUserName from "./components/GetUserName/getUserName";
import VideoTable from "./components/VideoTable/videoTable";

import ReactPlayer from "react-player";

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
    } else {
      tempGetUserPanel = null;
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
        <VideoTable />

        <div
          style={{
            top: "100px",
            left: "20px",
            position: "fixed",
            width: "950px",
            height: "60%",
            background: "orange",
            borderRadius: "5px"
          }}
        >
          <div>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=XOdxawBFtno"
              width="100%"
              height="80%"
              style={{ position: "absolute", shadow: "10px" }}
            />
          </div>

          <h1 style={{ position: "absolute", bottom: "0" }}>Youtube title</h1>
        </div>
      </div>
    );
  }
}

export default App;
