import * as React from "react";
import "./DataTable.css";
import ReactTable from "react-table";

class Table extends React.Component {
  constructor() {
    super();
    this.state = { data: this.props };
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Pick Up Date",
              columns: [
                {
                  id: "Pick Up Date",
                  Header: "Pick Up Date",
                  accessor: row => `${row.PickUpDate}`,
                  filterMethod: (filter, row) =>
                    row._original.PickUpDate.startsWith(filter.value)
                }
              ]
            },
            {
              Header: "Last Name",
              accessor: "lastname",
              filterable: false
            },
            {
              Header: "Stat"
            }
          ]}
          defaultSorted={[
            {
              id: "fullName",
              desc: false
            }
          ]}
          filterable={true}
          defaultFiltered={[
            {
              id: "fullName",
              value: "acc"
            }
          ]}
          onFilteredChange={filtered => this.setState({ filtered })}
          defaultPageSize={20}
          className="-striped -highlight"
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}
