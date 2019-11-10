import React from "react";
import DataTable from "./DataTable";

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
    const headings = ["Item", "Count", "Price", "Sold"];

    return (
      <div>
        <div className="Inventory">
          <h1 className="header">Inventory</h1>
          <DataTable headings={headings} rows={this.state.api_rows} />
        </div>
      </div>
    );
  }
}

export default Inventory;
