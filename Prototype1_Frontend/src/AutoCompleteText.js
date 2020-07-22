import React, { Component } from "react";
import "./AutoCompleteText.css";

//** might need to include props inside the constructor */
class AutoCompleteText extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      suggestions: [],
    };
  }

  onTextChanged = (e) => {
    const value = e.target.value; //* fix this target value
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = this.props.data.location
        .sort()
        .filter((v) => regex.test(v));
    }

    //* change the state of TextField, pass a method to do this
    this.setState({
      text: value,
      suggestions,
    });
  };

  //* pass a method to change the state of text and suggestions
  suggestionSelected(value) {
    this.setState({
      text: value,
      suggestions: [], //wipe the suggestions list when the user selects an item
    });
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item) => (
          <li
            onClick={() => {
              this.suggestionSelected(item);
              this.props.updatePoint(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <div className="AutoCompleteText">
        <input
          value={text}
          onChange={this.onTextChanged}
          type="text"
          placeholder="Enter Location"
          onfocus="inputFocus(this)"
          onblur="inputBlur(this)"
        />
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default AutoCompleteText;
