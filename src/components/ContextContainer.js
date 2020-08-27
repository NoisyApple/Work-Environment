import React, { Component } from "react";
import Question from "./Question";

export default class ContextContainer extends Component {
  state = {
    context: this.props.data.context,
    questions: this.props.data.questions,
  };

  render() {
    return (
      <div className="context-container">
        <h1 className="context-container-title">{this.state.context}</h1>
        {this.state.questions.map((question, i) => (
          <Question key={i} question={question} />
        ))}
      </div>
    );
  }
}
