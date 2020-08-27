import React, { Component } from "react";
import ContextContainer from "./ContextContainer";

export default class Survey extends Component {
  state = {
    survey: this.props.survey,
  };

  render() {
    return (
      <div className="survey">
        {this.state.survey.map((data, i) => (
          <ContextContainer key={i} data={data} />
        ))}
      </div>
    );
  }
}
