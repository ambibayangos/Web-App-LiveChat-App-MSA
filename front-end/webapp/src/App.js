import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/header";
import AddVideoPanel from "./components/AddVideoPanel/addVideoPanel";

class App extends Component {
  state = {
    addVideoButtonPressed: false
  };

  addVideoButtonPressedHandler = () => {
    const tempVdeioButton = this.state.addVideoButtonPressed;
    this.setState({ addVideoButtonPressed: !tempVdeioButton });
  };

  render() {
    //toggle video panel logic
    let tempVideoPanel;
    if (this.state.addVideoButtonPressed) {
      tempVideoPanel = <AddVideoPanel />;
    }

    return (
      <div className="App">
        <Header onAddVideoClicked={this.addVideoButtonPressedHandler} />
        {tempVideoPanel}
      </div>
    );
  }

  renderVideoPanel() {
    {
      renderAddVideoPanel();
    }
  }
}

export default App;
