import React, { Component } from "react";
import Question from "./Question";

export default class ContextContainer extends Component {
  state = {
    context: this.props.data.context,
    questions: this.props.data.questions,
    contextIndex: this.props.contextIndex,
  };

  render() {
    return (
      <div className="context-container">
        <h1 className="context-container-title">{this.state.context}</h1>
        <div className="question-container">
          {this.state.questions.map((question, i) => (
            <Question
              key={i}
              contextIndex={this.state.contextIndex}
              questionIndex={i}
              storeAnswer={this.props.storeAnswer}
              ref={`question${i}`}
              order={i + 1}
              question={question}
            />
          ))}
        </div>
      </div>
    );
  }
}
