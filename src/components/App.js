import React, { Component } from "react";
import Survey from "./Survey";

export default class App extends Component {
  state = {
    survey: [],
  };

  componentDidMount() {
    fetch("https://work-environment-664b6.firebaseio.com/db/survey.json")
      .then((res) => res.json())
      .then((data) => this.setState({ survey: data }));
  }

  render() {
    // console.log(this.state.survey);
    if (this.state.survey.length != 0)
      return (
        <div className="app">
          <Survey survey={this.state.survey} />
        </div>
      );
    else return <h1>Nothing to render</h1>;
  }
}
