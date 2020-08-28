import React, { Component } from "react";

export default class Respondent extends Component {
  state = {
    areas: this.props.areas,
    selectedArea: 0,
    selectedSubArea: 0,
  };

  update = (area, subArea) => {
    this.props.updateArea(area, subArea);
  };

  clear = () => {
    this.setState({ selectedArea: 0, selectedSubArea: 0 });
  };

  render() {
    let subAreasSelect = [];

    if (this.state.areas[this.state.selectedArea].hasOwnProperty("subarea")) {
      let { name, subareas } = this.state.areas[
        this.state.selectedArea
      ].subarea;

      subAreasSelect = (
        <div className="sub-area">
          <p>{`${name}:`}</p>
          <select
            value={this.state.selectedSubArea}
            onChange={(e) => {
              this.setState({ selectedSubArea: parseInt(e.target.value) });
              this.update(this.state.selectedArea, parseInt(e.target.value));
            }}
          >
            {subareas.map(({ name }, i) => (
              <option key={i} value={i}>
                {name}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className="respondent">
        <div className="main-area">
          <p>Area:</p>
          <select
            value={this.state.selectedArea}
            onChange={(e) => {
              this.setState({ selectedArea: parseInt(e.target.value) });
              this.update(parseInt(e.target.value), this.state.selectedSubArea);
            }}
          >
            {this.state.areas.map(({ name }, i) => (
              <option key={i} value={i}>
                {name}
              </option>
            ))}
          </select>
        </div>
        {subAreasSelect}
      </div>
    );
  }
}
