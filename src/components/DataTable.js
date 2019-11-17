import * as React from "react";
import "./DataTable.css";
import ReactTable from "react-table";

class DataTable extends React.Component {
  render() {
    return (
      <div>
        <ReactTable
          data={this.props.arrayOfObjects}
          columns={[
            {
              Header: "",
              columns: []
            },
            {
              Header: "Item",
              accessor: "Item",
              filterable: false
            },
            {
              Header: "Count",
              accessor: "Count",
              filterable: false
            },
            {
              Header: "Price",
              accessor: "Price",
              filterable: false
            },
            {
              Header: "Sold",
              accessor: "Sold",
              filterable: false
            }
          ]}
          defaultSorted={[
            {
              id: "Pick Up Date",
              desc: false
            }
          ]}
          filterable={true}
          defaultFiltered={[
            {
              id: "Pick Up Date",
              value: "12/31/2025"
            }
          ]}
          onFilteredChange={filtered => this.setState({ filtered })}
          defaultPageSize={20}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default DataTable;
