import * as React from "react";
import "./OrderDataTable.css";
import ReactTable from "react-table";

class OrderDataTable extends React.Component {
  render() {
    return (
      <div>
        <ReactTable
          data={this.props.arrayOfObjects}
          noDataText={<p> "Loading..." </p>}
          columns={[
            {
              Header: "Pickup Status",
              accessor: "PickupStatus",
              filterable: false,
              sortMethod: (a, b) => {
                a = a.props.pickUpStatus ? 1 : -1;
                b = b.props.pickUpStatus ? 1 : -1;
                if (a > b) {
                  return 1;
                }
                if (b > a) {
                  return -1;
                } else {
                  return 0;
                }
              }
            },
            {
              Header: "",
              columns: [
                {
                  id: "Pick Up Date",
                  Header: "Pick Up Date",
                  accessor: row => `${row.PickUpDate}`,
                  /*
                   Arrow function that returns true if Date values are
                   lesser and equal to the Date value that the user inputted.
                   */
                  filterMethod: (filter, row) => {
                    /*
                     Check that the filter value matches the format M/D/YYYY
                     and don't filter otherwise
                     */
                    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(filter.value)) {
                      return true;
                    }
                    if (
                      /*
                       Date.parse method parses a string representation of a date,
                       and returns the number of milliseconds
                       */
                      Date.parse(row._original.PickUpDate) <=
                      Date.parse(filter.value)
                    )
                      return true;
                    else {
                      return false;
                    }
                  },
                  sortMethod: (a, b) => {
                    if (isNaN(Date.parse(a))) {
                      return -1;
                    } else if (isNaN(Date.parse(b))) {
                      return 1;
                    } else {
                      return Date.parse(a) - Date.parse(b);
                    }
                  }
                }
              ]
            },
            {
              Header: "",
              columns: [
                {
                  id: "Last",
                  Header: "Last Name",
                  accessor: row => `${row.Last}`,
                  filterMethod: (filter, row) =>
                    row._original.Last.toLowerCase().startsWith(
                      filter.value.toLowerCase()
                    )
                }
              ]
            },
            {
              Header: "",
              columns: [
                {
                  id: "First",
                  Header: "First Name",
                  accessor: row => `${row.First}`,
                  filterMethod: (filter, row) =>
                    row._original.First.toLowerCase().startsWith(
                      filter.value.toLowerCase()
                    )
                }
              ]
            },
            {
              Header: "Size/Style",
              accessor: "SizeOrStyle",
              filterable: false
            },
            {
              Header: "Item Ordered",
              accessor: "ItemOrdered",
              filterable: false
            },
            {
              Header: "Item Quantity",
              accessor: "ItemQuantity",
              filterable: false,
              sortMethod: (a, b) => {
                a = parseInt(a);
                b = parseInt(b);
                if (a > b) {
                  return 1;
                }
                if (b > a) {
                  return -1;
                } else {
                  return 0;
                }
              }
            }
          ]}
          //default sorting based on Pick Up Date
          defaultSorted={[
            {
              id: "Pick Up Date",
              desc: false
            }
          ]}
          filterable={true}
          onFilteredChange={filtered => this.setState({filtered})}
          defaultPageSize={20}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default OrderDataTable;
