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
      .withUrl("https://sigalr-live-chat.azurewebsites.net/ChatHub")
      .build()
  };

  handleLike = (ID, Fav) => {
    this.state.hubConnection
      .invoke("UpdateFav", ID, Fav)
      .catch(err => console.log(err));
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
              <td
                onClick={() =>
                  this.handleLike(video.videoId, video.isFavourite)
                }
                className="center"
              >
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
                <img src={video.thumbnailUrl} width="150px" />
              </td>
              <td
                onClick={() =>
                  this.props.videoURL(video.webUrl, video.videoTitle)
                }
                className="center"
                style={{
                  fontSize: "0.9rem",
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

    this.state.hubConnection.on("LIKE", (ID, Fav) => {
      const toSend = [
        {
          from: "",
          op: "replace",
          path: "/isFavourite",
          value: !Fav
        }
      ];
      fetch("https://livewebchat.azurewebsites.net/api/Videos/update/" + ID, {
        body: JSON.stringify(toSend),
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json-patch+json"
        },
        method: "PATCH"
      }).then(() => {
        this.updateList();
      });
    });
  }

  render() {
    return <div className="video-table">{this.state.videoThumbNail}</div>;
  }
}

export default VideoTable;
