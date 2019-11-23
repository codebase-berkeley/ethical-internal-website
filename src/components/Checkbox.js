import React from "react";

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.pickUpStatus ? true : false
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  async handleCheckboxChange() {
    let response = fetch(
      "http://localhost:3001/orders/" + this.props.orderNumber,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          item: this.props.item,
          picked_up: !this.state.checked
        })
      }
    );
    await response;
    this.setState(state => ({
      checked: !state.checked
    }));
  }

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
