import React, { useState } from "react";
import { Column, useTable } from "react-table";
import { IRow } from "hooks/useColumns";

interface IProps<T extends IRow> {
  columns: Column<T>[];
  data: T[];
}

const Table = <T extends IRow>({ columns = [], data = [] }: IProps<T>) => {
  const [selectedRowId, setSelectedRowId] = useState<string>(null);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const selectRow = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedRowId(id);
  };

  return (
    <section className="relative w-full overflow-x-hidden bg-white">
      <div className="mx-auto px-4">
        <div
          className="overflow-x-scroll rounded-md border  border-gray-200 p-5 shadow-sm md:w-full"
          data-aos="fade-up"
        >
          <table
            className="w-full table-auto border-collapse  text-left"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr className="border-b" {...headerGroup.getHeaderGroupProps()}>
                  <th className="w-6 border-b px-2 pl-3 font-bold text-gray-700"></th>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="border-b py-3 pl-3 font-bold text-gray-700"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="border-b transition-all duration-300 ease-in-out odd:bg-white even:bg-gray-100 hover:bg-gray-200"
                    onClick={(
                      e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
                    ) => selectRow(e, row.id)}
                    key={row.id}
                  >
                    <td
                      className="flex items-center py-3 pl-3 align-middle font-normal text-gray-500"
                      key={row.id}
                    >
                      <input
                        type="radio"
                        id="themeToggler"
                        checked={row.id === selectedRowId}
                        className="peer hidden"
                      />
                      <label
                        htmlFor="themeToggler"
                        className={`${
                          row.id === selectedRowId
                            ? "bg-primary"
                            : "bg-gray-400"
                        } h-5 w-5 rounded-3xl`}
                      ></label>
                    </td>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="py-3 pl-3 font-normal text-gray-500"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Table;
