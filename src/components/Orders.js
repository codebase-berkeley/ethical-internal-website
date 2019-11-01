import React from "react";
import "./Orders.css";
import DataTable from "./DataTable";

function ArrayToObject() {
  var arr = [
    "pickUpDate",
    "last",
    "first",
    "orderNum",
    "size_style",
    "itemOrdered",
    "itemQuantity"
  ];
  //var objList = [];
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    obj[arr[i]] = this.state.orderRows.map(data => data[i]);
  }
  return obj;
}

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

  /*export function makeData(len = 5553) {
    return range(len).map(d => {
      return {
        ...newPerson(),
        children: range(10).map(newPerson)
      };
    });
  }*/

  /*
  function funcName(params) {
   return params + 2;
 }
  funcName(2);
  // 4

  var funcName = (params) => params + 2
  funcName(2);
  // 4*/

  render() {
    var arr = [
      "pickUpDate",
      "last",
      "first",
      "orderNum",
      "size_style",
      "itemOrdered",
      "itemQuantity"
    ];
    var orderLst = [];
    const nestedObjects = () => {
      //var objList = [];
      var obj = {};
      /*for (var i = 0; i < this.state.orderRows.length; i++) {
        obj[arr[i]] = this.state.orderRows.map(data =>
          data.map(value => value)
        );
      }*/
      var i = 0;
      while (i < this.state.orderRows.length) {
        orderLst[i] = this.state.orderRows.map(data => {
          for (var i = 0; i < arr.length; i++) {
            obj[arr[i]] = data[i];
          }
          i++;
        });
      }
      return obj;
    };

    const newPerson = () => {
      const statusChance = Math.random();
      return {
        firstName: "james",
        lastName: "li",
        age1: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status:
          statusChance > 0.66
            ? "relationship"
            : statusChance > 0.33
            ? "complicated"
            : "single"
      };
    };

    console.log(nestedObjects());
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
