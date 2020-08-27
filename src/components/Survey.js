import React, { Component } from "react";
import ContextContainer from "./ContextContainer";
import Respondent from "./Respondent";

export default class Survey extends Component {
  state = {
    survey: this.props.survey,
    areas: this.props.areas,
  };

  render() {
    return (
      <div className="survey">
        <Respondent areas={this.props.areas} />
        {this.state.survey.map((data, i) => (
          <ContextContainer key={i} data={data} />
        ))}
      </div>
    );
  }
}
