import React, { Component } from "react";
import "./videoTable.css";
import "semantic-ui-css/semantic.min.css";
import * as signalR from "@aspnet/signalr";

class VideoTable extends Component {
  state = {
    videoTitles: [],
    videoThumbNail: [],
    videoURL: [],
    hubConnection: new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44314/ChatHub")
      .build()
  };

  handleLike = video => {
    const toSend = [
      {
        from: "",
        op: "replace",
        path: "/isFavourite",
        value: !video.isFavourite
      }
    ];
    fetch(
      "https://livewebchat.azurewebsites.net/api/Videos/update/" +
        video.videoId,
      {
        body: JSON.stringify(toSend),
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json-patch+json"
        },
        method: "PATCH"
      }
    ).then(() => {
      this.updateList();
    });
  };

  deleteVideo = ID => {
    this.state.hubConnection
      .invoke("DeleteVideo", ID)
      .catch(err => console.log(err));
  };

  updateList = () => {
    fetch("https://livewebchat.azurewebsites.net/api/Videos", {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(reponse => {
        console.log(reponse);
        const output = [];
        reponse.forEach(video => {
          const row = (
            <tr style={{ width: "100%" }}>
              <td onClick={() => this.handleLike(video)} className="center">
                {video.isFavourite === "true" ? (
                  <i
                    class="star outline icon"
                    style={{
                      fontSize: "2rem",
                      color: "White",
                      paddingLeft: "20px"
                    }}
                  />
                ) : (
                  <i
                    class="star icon"
                    style={{
                      color: "White",
                      fontSize: "2rem",
                      paddingLeft: "20px"
                    }}
                  />
                )}
              </td>
              <td
                onClick={() =>
                  this.props.videoURL(video.webUrl, video.videoTitle)
                }
                className="center"
                style={{
                  paddingRight: "30px",
                  paddingLeft: "50px",
                  paddingTop: "10px"
                }}
              >
                <img src={video.thumbnailUrl} width="200px" />
              </td>
              <td
                onClick={() =>
                  this.props.videoURL(video.webUrl, video.videoTitle)
                }
                className="center"
                style={{
                  fontSize: "1.2rem",
                  color: "White",
                  paddingRight: "20px"
                }}
              >
                {video.videoTitle}
              </td>
              <td
                onClick={() => this.deleteVideo(video.videoId)}
                className="center"
              >
                <i
                  class="trash alternate outline icon"
                  style={{
                    fontSize: "2rem",
                    color: "White",
                    paddingRight: "50px",
                    paddingLeft: "50px"
                  }}
                />
              </td>
            </tr>
          );

          if (video.isFavourite) {
            output.unshift(row);
          } else {
            output.push(row);
          }
        });
        this.setState({ videoThumbNail: output });
      });
  };

  componentDidMount() {
    this.state.hubConnection
      .start()
      .then(() => this.state.hubConnection.invoke("BrodCast"));

    this.updateList();
    this.props.mount(this.updateList);
    this.state.hubConnection.on("DELETE", ID => {
      fetch("https://livewebchat.azurewebsites.net/api/Videos/" + ID, {
        method: "DELETE"
      }).then(() => {
        this.updateList(null);
        this.setState({ videoTitles: [] });
      });
    });
  }

  render() {
    return <div className="video-table">{this.state.videoThumbNail}</div>;
  }
}

export default VideoTable;
