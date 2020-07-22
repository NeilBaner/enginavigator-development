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
    return (
      <ul>
        {directions.map((location) => (
          <li>{location}</li>
        ))}
      </ul>
    );
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

    if (this.state.textStart === "E1-01-01") this.setState({ start: 1 });
    else if (this.state.textStart === "E1-01-02") this.setState({ start: 2 });
    else if (this.state.textStart === "E1-01-03") this.setState({ start: 3 });
    else if (this.state.textStart === "E1-01-04") this.setState({ start: 4 });
    else if (this.state.textStart === "E1-01-05") this.setState({ start: 5 });
    else if (this.state.textStart === "E1-01-06") this.setState({ start: 6 });

    if (this.state.textEnd === "E1-01-01") this.setState({ end: 1 });
    else if (this.state.textEnd === "E1-01-02") this.setState({ end: 2 });
    else if (this.state.textEnd === "E1-01-03") this.setState({ end: 3 });
    else if (this.state.textEnd === "E1-01-04") this.setState({ end: 4 });
    else if (this.state.textEnd === "E1-01-05") this.setState({ end: 5 });
    else if (this.state.textEnd === "E1-01-06") this.setState({ end: 6 });
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
