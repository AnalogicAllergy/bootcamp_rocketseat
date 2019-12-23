import React, { Component } from "react";
class TechList extends Component {
  state = {
    newTech: "",
    techs: ["Nodejs", "ReactJS", "React Native"]
  };
  handleInputChange = e => {
    this.setState({
      newTech: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };
  render() {
    return (
      <>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem tech={tech} />
          ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newTech}
            onChange={this.handleInputChange}
          />
          <button type="submit">Enviar</button>
        </form>
      </>
    );
  }
}
export default TechList;
