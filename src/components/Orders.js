import React from "react";
import OrderDataTable from "./OrderDataTable";
import Checkbox from "./Checkbox";

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
    /*
     this variable arrayOfObjects converts a nested array to an array of objects
     since react table needed an array of objects as input.
     */
    var arrayOfObjects = this.state.orderRows.map(function(item) {
      return {
        PickUpDate: item[0],
        Last: item[1],
        First: item[2],
        Order: item[3],
        SizeOrStyle: item[4],
        ItemOrdered: item[5],
        ItemQuantity: item[6],
        PickupStatus: (
          <Checkbox
            key={item[3]}
            pickUpStatus={item[7]}
            orderNumber={item[3]}
            item={item[5]}
          />
        )
      };
    });

    return (
      <div className="header">
        <h1 className="orders"> ORDERS </h1>
        <OrderDataTable arrayOfObjects={arrayOfObjects} />
      </div>
    );
  }
}

export default Orders;
