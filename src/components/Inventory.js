import React from "react";
import DataTable from "./DataTable";

class Inventory extends React.Component {
  render() {
    const headings = ["Item", "Count", "Price", "Cost", "Profit"];

    const rows = [
      ["Heart Shirt", 20, 10, "$9.99", "$0.01"],
      ["Skull Shirt", 50, 20, "$9.99", "$10.01"]
    ];
    return (
      <div className="Inventory">
        <h1>Inventory</h1>
        <DataTable headings={headings} rows={rows} />
      </div>
    );
  }
}

export default Inventory;
