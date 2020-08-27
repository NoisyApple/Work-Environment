import React, { Component } from "react";

export default class Question extends Component {
  state = {
    question: this.props.question,
    anwers: ["1", "2", "3", "4", "N/A"],
    selected: -1,
  };

  answerSelected = (indexToSelect) => {
    this.setState({ selected: indexToSelect });
  };

  render() {
    return (
      <div className="question">
        <p className="question-text">{this.state.question}</p>
        <div className="answer-container">
          {this.state.anwers.map((answer, i) => (
            <button
              key={i}
              style={
                this.state.selected == i ? { background: "cornflowerblue" } : {}
              }
              onClick={() => this.answerSelected(i)}
              className="answer-button"
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
