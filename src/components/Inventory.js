import React from "react";
import DataTable from "./DataTable";
const axios = require("axios");

class Inventory extends React.Component {
  constructor() {
    super();
    this.state = {
      output: []
    };
  }

  async componentDidMount() {
    var that = this;
    axios
      .get("http://localhost:2999/inventory")
      .then(function(response) {
        that.setState({ output: response.data });
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.output !== []) {
      const headings = ["Item", "Count", "Price", "Sold"];
      console.log(this.state.output);
      const api_rows = this.state.output;

      return (
        <div>
          <div className="Inventory">
            <h1>Inventory</h1>
            <DataTable headings={headings} rows={api_rows} />
          </div>
        </div>
      );
    }
  }
}

export default Inventory;
