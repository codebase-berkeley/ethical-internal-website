import React from "react";
import "./Orders.css";
import DataTable from "./DataTable";

class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      output: []
    };
  }
  async componentDidMount() {
    const response = await fetch("http://localhost:3001/orders");
    const json = await response.json();
    this.setState({ output: json.map(elem => elem) });
  }

  render() {
    const headings = [
      "Pick Up Date",
      "Last",
      "First",
      "Order#",
      "Size/Style",
      "Item Ordered",
      "Item Quantity"
    ];
    const api_rows = this.state.output;

    return (
      <div className="Orders">
        <DataTable headings={headings} rows={api_rows} />
      </div>
    );
  }
}

export default Orders;
