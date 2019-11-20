import React from "react";
import DataTable from "./DataTable";
import "./DataTable.css";

class Inventory extends React.Component {
  constructor() {
    super();
    this.state = {
      api_rows: []
    };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:3001/inventory");
    const json = await response.json();
    this.setState({ api_rows: json });
  }

  render() {
    var arrayOfObjects = this.state.api_rows.map(function (item) {
      return {
        Item: item[0],
        Count: item[1],
        Price: item[2],
        Sold: item[3]
      };
    });
    return (
      <div className="header">
        <h1 className="Inventory"> INVENTORY </h1>
        <DataTable arrayOfObjects={arrayOfObjects} />
      </div>
    );
  }
}

export default Inventory;
