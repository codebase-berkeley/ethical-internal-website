import React from "react";

class Checkbox extends React.Component {
  constructor(pickUpStatus) {
    super();
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.state = {
      checked: pickUpStatus ? true : false
    };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:3001/orders");
    const json = await response.json();
    this.setState({ postValues: json });
  }

  handleCheckboxChange = event =>
    this.setState({ checked: event.target.checked });

  render() {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            defaultChecked={this.state.checked}
            onChange={this.handleCheckboxChange}
          />
        </label>
      </div>
    );
  }
}

export default Checkbox;
