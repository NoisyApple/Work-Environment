import React, { Component } from "react";

export default class SurveyControls extends Component {
  submit = () => {
    this.props.submitSurvey();
  };

  render() {
    return (
      <div className="survey-controls">
        <div className="inner-container">
          <button onClick={this.submit}>Enviar</button>
        </div>
      </div>
    );
  }
}
