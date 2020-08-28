import React, { Component } from "react";

export default class Question extends Component {
  state = {
    question: this.props.question,
    anwers: ["1", "2", "3", "4", "N/A"],
    selected: -1,
    contextIndex: this.props.contextIndex,
    questionIndex: this.props.questionIndex,
    isMarked: false,
  };

  answerSelected = (indexToSelect) => {
    this.unMark();
    this.setState({ selected: indexToSelect });
    this.props.storeAnswer(
      this.state.contextIndex,
      this.state.questionIndex,
      indexToSelect
    );
  };

  mark = () => {
    this.setState({ isMarked: true });
  };

  unMark = () => {
    this.setState({ isMarked: false });
  };

  clear = () => {
    this.setState({ selected: -1 });
  };

  render() {
    return (
      <div
        className={`question ${this.state.isMarked ? "question-marked" : ""}`}
      >
        <div className="container">
          <div className="question-order">{this.props.order}</div>
          <p className="question-text">{this.state.question}</p>
        </div>
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
