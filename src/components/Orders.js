import React from "react";
import "./Orders.css";
import DataTable from "./DataTable";

class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      orderRows: []
    };
  }
  async componentDidMount() {
    const response = await fetch("http://localhost:3001/orders");
    const json = await response.json();
    this.setState({ orderRows: json.map(elem => elem) });
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

    return (
      <div className="Orders">
        <DataTable headings={headings} rows={this.state.orderRows} />
      </div>
    );
  }
}

export default Orders;
