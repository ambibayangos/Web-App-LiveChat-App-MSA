import React, { Component } from "react";
import "./videoTable.css";
import "semantic-ui-css/semantic.min.css";

class VideoTable extends Component {
  state = { videoTitles: [], videoThumbNail: [], videoURL: [] };

  /*
  getVideoInfo = () => {
    fetch("https://livewebchat.azurewebsites.net/api/Videos", {
      method: "GET"
    })
      .then(response => {
        const res = response.json();
        console.log(res);
        return res;
      })
      .then(response => {
        let tempVideoTitles = [];
        let tempThumNail = [];
        let tempVideoURL = [];
        response.map(video => {
          tempVideoTitles = [...this.state.videoTitles, video.videoTitle];
          tempThumNail = [...this.state.videoThumbNail, video.thumbnailUrl];
          tempVideoURL = [...this.state.videoURL, video.webUrl];
          this.setState({
            videoTitles: tempVideoTitles,
            videoThumbNail: tempThumNail,
            videoURL: tempVideoURL
          });
        });
      });
    console.log(this.state.videoTitles);
  };

  async componentDidMount() {
    this.getVideoInfo();
  }

  */

  updateList = () => {
    fetch("https://livewebchat.azurewebsites.net/api/Videos", {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(reponse => {
        const output = [];
        reponse.forEach(video => {
          const row = (
            <tr>
              <td>
                <i class="star outline icon" />
              </td>
              <td>
                <img src={video.thumbnailUrl} width="100px" />}
              </td>
              <td>{video.videoTitle}</td>
            </tr>
          );
          output.push(row);
        });
        this.setState({ videoThumbNail: output });
      });
  };

  componentDidMount() {
    this.updateList();
  }

  render() {
    return (
      <div className="video-table">
        <div className="scroll">{this.state.videoThumbNail}</div>
      </div>
    );
  }
}

export default VideoTable;
