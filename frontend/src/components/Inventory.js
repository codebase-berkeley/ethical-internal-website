import React from "react";
import DataTable from "./DataTable";
import "./DataTable.css";
const localStorage = require("local-storage");

class Inventory extends React.Component {
  constructor() {
    super();
    this.state = {
      api_rows: []
    };
  }

  async componentDidMount() {
    const response = await fetch("https://ethical-backend.herokuapp.com/inventory", {
      headers: { authorization: localStorage.get("token") }
    });
    if (response.status === 401) {
      let path = "/login";
      this.props.history.push(path);
    }
    const json = await response.json();
    this.setState({ api_rows: json });
  }

  render() {
    var arrayOfObjects = this.state.api_rows.map(function(item) {
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
