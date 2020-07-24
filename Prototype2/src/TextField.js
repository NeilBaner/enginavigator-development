import React, { Component } from "react";
import AutoCompleteText from "./AutoCompleteText";
import "./TextField.css";

const https = require("https");

class TextField extends Component {
  constructor() {
    super();
    this.state = {
      directions: [],
      location: [],
      start: 1,
      end: 5,
      textStart: "",
      textEnd: "",
      suggestions: [],
    };
  }

  //expression works well :)
  updateText() {
    this.setState({ directions: ["Loading Directions..."] });
    https.get(
      `https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/routes?start=${this.state.start}&end=${this.state.end}`,
      (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          //passes an array of string, state changes to array of locations given by the API
          this.setState({
            directions: JSON.parse(data).map((obj) => {
              return obj.edge_description;
            }),
          });
        });
      }
    );
  }

  componentDidMount() {
    https
      .get(
        "https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes?type=list&key=0",
        (resp) => {
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });
          resp.on("end", () => {
            //passes an array of string, state changes to array of locations given by the API
            console.log(data);
            this.setState({
              location: JSON.parse(data).map((obj) => {
                return obj.vertex_name;
              }),
            });
          });
        }
      )
      .on("error", (err) => {
        console.log(err);
      });
  }

  renderDirections() {
    const { directions } = this.state;
    if (directions.length == 1) {
      return (
        <ul>
          {directions.map((location) => (
            <li>{location}</li>
          ))}
        </ul>
      );
    } else {
      return (
        <ol>
          {directions.map((location) => (
            <li>{location}</li>
          ))}
        </ol>
      );
    }
  }

  updateStartPoint(text) {
    this.setState({ textStart: text });
    this.checkStartEnd();
  }

  updateEndPoint(text) {
    this.setState({ textEnd: text });
    this.checkStartEnd();
  }

  checkStartEnd() {
    console.log(this.state.textStart);
    console.log(this.state.textEnd);

    if (this.state.textEnd != "" && this.state.textStart != "") {
      https.get("https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes?type=search&key=" + this.state.textStart, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          //sets the start point correctly based on the API
          console.log(data);
          this.setState({
            start: JSON.parse(data).map((obj) => {
              return obj.vertex_id;
            }),
          });
          https.get("https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes?type=search&key=" + this.state.textEnd, (resp) => {
            let data = "";
            resp.on("data", (chunk) => {
              data += chunk;
            });
            resp.on("end", () => {
              //sets the end point correctly based on the API
              console.log(data);
              this.setState({
                end: JSON.parse(data).map((obj) => {
                  return obj.vertex_id;
                }),
              });
            });
          });
        });
      });
    }
  }

  render() {
    return (
      <div className="TextField">
        <AutoCompleteText
          data={{
            location: this.state.location,
          }}
          updatePoint={this.updateStartPoint.bind(this)}
        />
        <br />
        <br />
        <AutoCompleteText
          data={{
            location: this.state.location,
          }}
          updatePoint={this.updateEndPoint.bind(this)}
        />
        <br />
        <br />
        <button
          onClick={() => {
            this.checkStartEnd();
            this.updateText();
          }}
          className="btn btn-primary"
        >
          Search
        </button>
        {this.renderDirections()}
      </div>
    );
  }
}

export default TextField;
