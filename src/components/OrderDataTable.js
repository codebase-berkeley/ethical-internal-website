import * as React from "react";
import "./OrderDataTable.css";
import ReactTable from "react-table";
import "react-table/react-table.css";

class OrderDataTable extends React.Component {
  render() {
    console.log(this.props.arrayOfObjects);
    return (
      <div>
        <ReactTable
          data={this.props.arrayOfObjects}
          columns={[
            {
              Header: "Pick Up Date",
              columns: [
                {
                  id: "Pick Up Date",
                  Header: "Pick Up Date",
                  accessor: row => {
                    return row.PickUpDate.format("YYYY/MM/DD HH:mm:ss");
                  },
                  filterMethod: (filter, row) =>
                    row._original.PickUpDate.startsWith(filter.value)
                  /*{
                      if (row.getMilliseconds() > filter.value.getMilliseconds())

                        return true
                        else:
                        return else
                    }*/
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
              id: "PickUpData",
              desc: false
            }
          ]}
          filterable={true}
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
