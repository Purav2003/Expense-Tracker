import React from "react";
import { useTable, usePagination } from "react-table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid,AreaChart,Tooltip,Area } from 'recharts';

const DataTable = (props) => {
  // Memos
  const data = React.useMemo(() => props.data, [props.data]);
  const columns = React.useMemo(() => props.columns, [props.columns]);
  const initialState = React.useMemo(() => props.initialState);

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState
    },
    usePagination
  );
  //change
  return (
    <>
      <table {...getTableProps()} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-6 py-3">{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        &nbsp;{" << "}&nbsp;
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        &nbsp; {" Previous "}&nbsp;
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {" Next "}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {" >> "}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 15].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                {/* <CartesianGrid /> */}
                <XAxis dataKey="description" />
                <YAxis />
                <Tooltip />
                <Area type="natural" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
            </AreaChart> 
    </>
  );
};

export default DataTable;
