import * as React from "react";
import "./OrderDataTable.css";
import ReactTable from "react-table";

class OrderDataTable extends React.Component {
  render() {
    return (
      <div>
        <ReactTable
          data={this.props.arrayOfObjects}
          columns={[
            {
              Header: "",
              columns: [
                {
                  id: "Pick Up Date",
                  Header: "Pick Up Date",
                  accessor: row => `${row.PickUpDate}`,
                  filterMethod: (filter, row) => {
                    if (
                      Date.parse(row._original.PickUpDate) <=
                      Date.parse(filter.value)
                    )
                      return true;
                    else {
                      return false;
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
              Header: "Orders",
              accessor: "Order",
              filterable: false
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
              filterable: false
            },
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

export default OrderDataTable;
