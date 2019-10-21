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
  render() {
    const headings = ["Name", "Item", "Quantity", "Size"];

    const rows = [
      ["Trevor Aquino", "The Shirt", 2, "M"],
      ["Parth Shah", "The Other Shirt", 1, "L"]
    ];
    return (
      <div className="Orders">
        <DataTable headings={headings} rows={rows} />
      </div>
    );
  }
}

export default Orders;
