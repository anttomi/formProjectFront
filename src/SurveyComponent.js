import React from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";


class SurveyComponent extends React.Component {
  constructor(props) {

    super(props);
    this.state = { isCompleted: false };
    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }
    onCompleteComponent() {
      this.setState({ isCompleted: true });
    }
    render() {
      let json = {
        questions: [
          {
            type: "text",
            name: "kysymys1",
            title: "Mitä kuuluu?",
            isRequired: true,
            hasSelectAll: true,
            hasNone: true,
            noneText: "Ei mikään näistä",
            colCount: 2,
            choicesOrder: "asc",
            choices: [
              "Erittäin huonoo",
              "Hyvveee",
              "Huonoo",
              "Vaihtelevaa",
            ]
          },
          {
            type: "checkbox",
            name: "kysymys 2",
            title: "Kysymys",
            isRequired: true,
            hasSelectAll: false,
            hasNone: false,
            colCount: 3,
            choicesOrder: "asc",
            choices: [
              "vaihtoehto1",
              "vaihtoehto2",
              "vaihtoehto3",
            ]
          },
          {
            type: "checkbox",
            name: "kysymys2",
            title: "Kysymys 3",
            isRequired: true,
            requiredErrorText: "Muista vastata kaikkiin kysymyksiin!",
            hasSelectAll: false,
            hasNone: false,
            colCount: 3,
            choicesOrder: "asc",
            choices: [
              "vaihtoehto1",
              "vaihtoehto2",
              "vaihtoehto3",
            ]
          }
        ]
      };
      var surveyRender = !this.state.isCompleted ? (
        <Survey.Survey
          json={json}
          showCompletedPage={false}
          onComplete={this.onCompleteComponent}
          completeText="Lähetä"
        />
      ) : null;
      var onCompleteComponent = this.state.isCompleted ? (
        <div>Vastasit kaikkiin pakollisiin kysymyksiin. Kiitos</div>
      ) : null;
      return (
        <div>
          {surveyRender}
          {onCompleteComponent}
        </div>
        
      );
    }
  }

export default SurveyComponent;

