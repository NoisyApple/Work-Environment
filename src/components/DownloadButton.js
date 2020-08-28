import React, { Component } from "react";

export default class DownloadButton extends Component {
  downloadCSV = () => {
    fetch("https://work-environment-664b6.firebaseio.com/db/answers.json")
      .then((res) => res.json())
      .then((dataAnswers) => {
        fetch("https://work-environment-664b6.firebaseio.com/db/areas.json")
          .then((res) => res.json())
          .then((dataAreas) => {
            let answers = dataAnswers;
            let areas = dataAreas;
            let alteredData = {};

            answers.forEach((answer) => {
              let area = answer.area;
              let subarea = answer.subarea;
              let hasSubarea = areas[area].hasOwnProperty("subarea");
              let groupName;

              if (!hasSubarea) groupName = areas[area].name;
              else
                groupName = `${areas[area].name}-${areas[area]["subarea"]["subareas"][subarea].name}`;

              if (!alteredData.hasOwnProperty(groupName)) {
                alteredData[groupName] = {
                  0: [0, 0, 0, 0, 0],
                  1: [0, 0, 0, 0, 0],
                  2: [0, 0, 0, 0, 0],
                  3: [0, 0, 0, 0, 0],
                  4: [0, 0, 0, 0, 0],
                };
              }

              for (let context = 0; context < 5; context++) {
                for (
                  let question = 0;
                  question < answer[context].length;
                  question++
                ) {
                  alteredData[groupName][context][answer[context][question]]++;
                }
              }
            });

            let csvContent = "data:text/csv;charset=utf-8,";

            for (const group in alteredData) {
              for (const context in alteredData[group]) {
                let row = alteredData[group][context].join(",");
                csvContent += row + "\r\n";
              }
            }

            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "Datos.csv");
            document.body.appendChild(link);

            link.click();
          });
      });
  };

  render() {
    return (
      <div className="download-button">
        <button onClick={this.downloadCSV}>Descargar datos</button>
      </div>
    );
  }
}
