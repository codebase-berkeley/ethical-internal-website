import React from "react";
import "./Orders.css";
import DataTable from "./DataTable";

// import {
//   useTable,
//   useGroupBy,
//   useFilters,
//   useSortBy,
//   useExpanded,
//   usePagination
// } from "react-table";

// function Table({ columns, data }) {
//   // Use the state and functions returned from useTable to build your UI
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({
//     columns,
//   })}

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Orders',
//         columns: [
//           {
//             Header: 'Name',
//             accessor: 'name',
//           },
//           {
//             Header: 'Item',
//             accessor: 'item',
//           },
//           {
//             Header: 'Quantity',
//             accessor: 'quantity',
//           },
//           {
//             Header: 'Size',
//             accessor: 'size',
//           },
//         ],
//       }
//     ],
//     []
//   )

class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      output: []
    };
  }
  async componentDidMount() {
    const response = await fetch("http://localhost:3000/orders");
    const json = await response.json();
    //console.log(response.body.read());
    this.setState({ output: json.map(elem => elem) });
  }
  // updateStats(){
  //   this.setState({
  //     output: this.state.output
  //   })
  // }

  render() {
    const headings = [
      "Pick Up Date",
      "Last",
      "First",
      "Order#",
      "Size/Style",
      "Item Ordered",
      "Item Quantity"
    ];
    const api_rows = this.state.output;
    console.log(api_rows);
    // for (let i = 0; i < 4; i++) {

    //   const rows =[]
    // }
    //for
    // const rows = [
    //   ["Trevor Aquino", "The Shirt", 2, "M"],
    //   ["Parth Shah", "The Other Shirt", 1, "L"]
    // ];
    return (
      <div className="Orders">
        <DataTable headings={headings} rows={api_rows} />
      </div>
    );
  }
}

export default Orders;
