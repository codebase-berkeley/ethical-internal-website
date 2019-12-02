import React from "react";
import OrderDataTable from "./OrderDataTable";
const localStorage = require("local-storage");

class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      orderRows: []
    };
  }
  async componentDidMount() {
    const response = await fetch("http://localhost:3001/orders", {
      headers: { authorization: localStorage.get("token") }
    });
    const json = await response.json();
    if (response.status === 401) {
      let path = "/login";
      this.props.history.push(path);
    }
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

    var arrayOfObjects = this.state.orderRows.map(function(item) {
      return {
        PickUpDate: item[0],
        Last: item[1],
        First: item[2],
        Order: item[3],
        SizeOrStyle: item[4],
        ItemOrdered: item[5],
        ItemQuantity: item[6]
      };
    });
    return (
      <div className="Orders">
        <h1 className="header"> Orders </h1>
        <OrderDataTable arrayOfObjects={arrayOfObjects} />
      </div>
    );
  }
}

export default Orders;
