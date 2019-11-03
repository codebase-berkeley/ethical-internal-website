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
    // console.log(await fetch("http://localhost:3001/inventory"));
    // console.log(response);
    const json = await response.json();
    // console.log(json);
    this.setState({ api_rows: json });
    // console.log(this.state.api_rows);
  }

  render() {
    if (this.state.api_rows !== []) {
      const headings = ["Item", "Count", "Price", "Sold"];

      return (
        <div>
          <div className="Inventory">
            <h1>Inventory</h1>
            <DataTable headings={headings} rows={this.state.api_rows} />
          </div>
        </div>
      );
    }
  }
}

export default Inventory;
