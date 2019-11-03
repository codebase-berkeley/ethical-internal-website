import * as React from "react";
import "./OrderDataTable.css";
import ReactTable from "react-table";
//import "react-table/react-table.css";

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
                  filterMethod: (filter, row) =>
                    //row._original.PickUpDate.startsWith(filter.value)
                    {
                      //console.log(row);
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
              Header: "Last Name",
              accessor: "Last",
              filterable: false
            },
            {
              Header: "First Name",
              accessor: "First",
              filterable: false
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
