import React, { Component } from "react";
import Survey from "./Survey";

export default class App extends Component {
  state = {
    survey: [],
    areas: [],
  };

  componentDidMount() {
    fetch("https://work-environment-664b6.firebaseio.com/db.json")
      .then((res) => res.json())
      .then((data) =>
        this.setState({ survey: data.survey, areas: data.areas })
      );
  }

  render() {
    if (this.state.survey.length != 0 && this.state.areas.length != 0)
      return (
        <div className="app">
          <Survey survey={this.state.survey} areas={this.state.areas} />
        </div>
      );
    else return <h1>Nothing to render</h1>;
  }
}
