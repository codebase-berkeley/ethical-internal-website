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
    //console.log(this.state.orderRows);
    const headings = [
      "Pick Up Date",
      "Last",
      "First",
      "Order#",
      "Size/Style",
      "Item Ordered",
      "Item Quantity"
    ];

    var arrayOfObjects = this.state.orderRows.map(function(item) {
      return {
        "Pick Up Date": item[0],
        Last: item[1],
        First: item[2],
        "Order#": item[3],
        "Size/Style": item[4],
        "Item Ordered": item[5],
        "Item Quantity": item[6]
      };
    });
    console.log(arrayOfObjects);

    return (
      <div className="Orders">
        <DataTable headings={headings} rows={this.state.orderRows} />
      </div>
    );
  }
}

export default Orders;
