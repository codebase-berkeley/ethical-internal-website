import * as React from "react";
import "./DataTable.css";
import ReactTable from "react-table";

class DataTable extends React.Component {
  render() {
    return (
      <div>
        <ReactTable
          data={this.props.arrayOfObjects}
          noDataText={() => "Loading..."}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={[
            {
              columns: [
                {
                  id: "Item",
                  Header: "Item",
                  accessor: row => `${row.Item}`,
                  filterMethod: (filter, row) => {
                    return row._original.Item.toLowerCase().includes(
                      filter.value.toLowerCase()
                    );
                  }
                }
              ]
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
          searching={true}
          defaultFiltered={[
            {
              id: "Item",
              value: ""
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
