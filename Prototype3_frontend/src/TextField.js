import React, { Component } from "react";
import AutoCompleteText from "./AutoCompleteText";
import "./TextField.css";
import { join } from "path";

const https = require("https");

class TextField extends Component {
  constructor() {
    super();
    this.state = {
      directions: [],
      location: [],
      start: 1,
      end: 5,
      suggestions: [],
    };
  }

  //expression works well :)
  updateText() {
    https
      .get(
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
      )
      .on("error", (err) => {
        console.log(err);
      });
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

  //* takes in parameter of name and returns the obj.vertex_id
  updateStartPoint(name) {
    //http request
    https
      .get(
        "https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes?type=list&key=0",
        (resp) => {
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });
          resp.on("end", () => {
            let info = JSON.parse(data);

            let vertexID = info.filter((obj) => {
              return obj.vertex_name === name;
            });

            this.setState({ start: vertexID[0].vertex_id });
          });
        }
      )
      .on("error", (err) => {
        console.log(err);
      });
  }

  updateEndPoint(name) {
    let vertexID; //stores the JSON w vertex_id and name

    //http request
    https
      .get(
        "https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes?type=list&key=0",
        (resp) => {
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });
          resp.on("end", () => {
            let info = JSON.parse(data);

            let vertexID = info.filter((obj) => {
              return obj.vertex_name === name;
            });

            this.setState({ end: vertexID[0].vertex_id });
          });
        }
      )
      .on("error", (err) => {
        console.log(err);
      });
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
