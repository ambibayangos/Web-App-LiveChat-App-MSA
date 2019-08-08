import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/header";
import AddVideoPanel from "./components/AddVideoPanel/addVideoPanel";

class App extends Component {
  state = {
    addVideoButtonPressed: false
  };

  render() {
    //toggle video panel logic
    let tempVideoPanel = this.renderVideoPanel();

    return (
      <div className="App">
        <Header onAddVideoClicked={this.addVideoButtonPressedHandler} />
        {tempVideoPanel}
      </div>
    );
  }

  /*Events Handlers && Helper Functions*/

  addVideoButtonPressedHandler = () => {
    const tempVdeioButton = this.state.addVideoButtonPressed;
    this.setState({ addVideoButtonPressed: !tempVdeioButton });
  };

  renderVideoPanel() {
    let tempVideoPanel;
    if (this.state.addVideoButtonPressed) {
      tempVideoPanel = <AddVideoPanel />;
    }
    return tempVideoPanel;
  }
}

export default App;
