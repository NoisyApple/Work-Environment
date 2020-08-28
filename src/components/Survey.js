import React, { Component } from "react";
import ContextContainer from "./ContextContainer";
import Respondent from "./Respondent";
import SurveyControls from "./SurveyControls";

export default class Survey extends Component {
  state = {
    survey: this.props.survey,
    areas: this.props.areas,
    answers: {},
    area: 0,
    subarea: -1,
  };

  clearSurvey = () => {
    this.refs.respondent.clear();

    for (const ctxContainer in this.refs)
      for (const question in this.refs[ctxContainer].refs)
        this.refs[ctxContainer].refs[question].clear();
  };

  updateArea = (area, subArea) => {
    this.setState({ area: area, subarea: subArea });
  };

  storeAnswer = (context, question, answer) => {
    let tempAnswers = this.state.answers;
    if (tempAnswers[context] == undefined) tempAnswers[context] = {};
    tempAnswers[context][question] = answer;
    this.setState({ answers: tempAnswers });
  };

  scrollToTop = () => {
    // const c = document.documentElement.scrollTop || document.body.scrollTop;
    // if (c > 0) {
    //   window.requestAnimationFrame(this.scrollToTop);
    //   window.scrollTo(0, c - c / 4);
    // }

    window.scrollTo(0, 0);
  };

  submitSurvey = () => {
    let allQuestionsFilled = true;

    for (const refCtxContainer in this.refs)
      for (const refQuestion in this.refs[refCtxContainer].refs) {
        let question = this.refs[refCtxContainer].refs[refQuestion];
        let isFilled = question.state.selected != -1;

        if (!isFilled) question.mark();

        allQuestionsFilled = allQuestionsFilled && isFilled;
      }

    if (allQuestionsFilled) {
      let data = {};
      let index = this.props.surveyIndex;
      let tempAnswers = this.state.answers;

      this.scrollToTop();
      this.clearSurvey();

      tempAnswers.area = this.state.area;
      tempAnswers.subarea = this.state.subarea;

      data[index] = this.state.answers;

      let requestOptions = {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch(
        "https://work-environment-664b6.firebaseio.com/db/answers.json",
        requestOptions
      ).then(() => {
        requestOptions.body = JSON.stringify({ surveyIndex: index + 1 });

        fetch(
          "https://work-environment-664b6.firebaseio.com/db.json",
          requestOptions
        ).then(() => {
          this.props.updateSurveyIndex(index + 1);
        });
      });
    } else {
      console.log("There are questions that have not been filled yet");
    }
  };

  render() {
    return (
      <div className="survey">
        <div className="survey-index">
          {`Encuesta No. ${this.props.surveyIndex + 1}`}
        </div>
        <Respondent
          ref="respondent"
          updateArea={this.updateArea}
          areas={this.props.areas}
        />
        {this.state.survey.map((data, i) => (
          <ContextContainer
            ref={`ctxContainer${i}`}
            storeAnswer={this.storeAnswer}
            key={i}
            contextIndex={i}
            data={data}
          />
        ))}
        <SurveyControls submitSurvey={this.submitSurvey} />
      </div>
    );
  }
}
