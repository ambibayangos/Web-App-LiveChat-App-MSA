import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/header";
import AddVideoPanel from "./components/AddVideoPanel/addVideoPanel";
import BackDrop from "./components/BackDrop/backDrop";
import ChatBox from "./components/ChatBox/chatBox";
import GetUserName from "./components/GetUserName/getUserName";
import VideoTable from "./components/VideoTable/videoTable";
import * as signalR from "@aspnet/signalr";
import ReactPlayer from "react-player";

class App extends Component {
  state = {
    addVideoButtonPressed: false,
    userIsReady: true,
    userName: "annonymous",
    updateVideoList: Object,
    playingVideoURL: "",
    playingVideoTitle: "",
    hubConnection: new signalR.HubConnectionBuilder()
      .withUrl("https://sigalr-live-chat.azurewebsites.net/ChatHub")
      .build()
  };

  /*Events Handlers && Helper Functions*/

  updataPlayingVideo = (URL, TITLE) => {
    this.state.hubConnection
      .invoke("UpdatePlayingVideo", URL, TITLE)
      .catch(err => console.log);
  };

  listMounted = callBacks => {
    this.setState({ updateVideoList: callBacks });
  };

  addVideoHandler = URL => {
    const body = { url: URL };
    fetch("https://livewebchat.azurewebsites.net/api/Videos", {
      body: JSON.stringify(body),
      headers: {
        Accept: "Text/Plain",
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then(() => {
      this.state.updateVideoList();
    });
  };

  addPlayer1Handler = name => {
    const body = { name: name };
    fetch("https://livewebchat.azurewebsites.net/api/Players", {
      body: JSON.stringify(body),
      headers: {
        Accept: "Text/Plain",
        "Content-Type": "application/json"
      },
      method: "POST"
    });
  };

  addPlayer2Handler = name => {
    const body = { name: name };
    fetch("https://livewebchat.azurewebsites.net/api/Players", {
      body: JSON.stringify(body),
      headers: {
        Accept: "Text/Plain",
        "Content-Type": "application/json"
      },
      method: "POST"
    });
  };

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
        <AddVideoPanel
          onExitClick={this.addVideoButtonPressedHandler}
          onSaveVideoCliked={this.addVideoButtonPressedHandler}
          videoAdded={this.addVideoHandler}
          player1Added={this.addPlayer1Handler}
          player2Added={this.addPlayer2Handler}
        />
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

  componentDidMount() {
    this.state.hubConnection
      .start()
      .then(() => this.state.hubConnection.invoke("BrodCast"));

    this.state.hubConnection.on("Update", (URL, TITLE) => {
      this.setState({ playingVideoURL: URL, playingVideoTitle: TITLE });
    });
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
        <VideoTable
          mount={this.listMounted}
          videoURL={this.updataPlayingVideo}
        />

        <div
          style={{
            top: "100px",
            left: "100px" /*20px*/,
            position: "fixed",
            width: "800px", //950px
            height: "55%",
            background: "FloralWhite",
            borderRadius: "5px"
          }}
        >
          <div>
            <ReactPlayer
              url={
                this.state.playingVideoURL === ""
                  ? "https://www.youtube.com/watch?v=wVMPqFb5Iy8"
                  : this.state.playingVideoURL
              }
              width="100%"
              height="85%"
              style={{ position: "absolute", shadow: "10px" }}
            />
          </div>

          <h1
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              fontSize: "1rem"
            }}
          >
            {this.state.playingVideoTitle === ""
              ? "Aimer is good"
              : this.state.playingVideoTitle}
          </h1>
        </div>
      </div>
    );
  }
}

export default App;
