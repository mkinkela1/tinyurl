import React, { useState } from "react";
import { Column, useTable } from "react-table";
import { IRow } from "hooks/useColumns";
import { useRouter } from "next/router";
import { isNullOrUndefined } from "utils/helpers";
import Button from "components/Button";

interface IMeta {
  beforeCursor?: string;
  afterCursor?: string;
  pageSize?: number;
  orderBy?: "ASC" | "DESC";
  totalCount?: number;
}

interface IProps<T extends IRow> {
  columns: Column<T>[];
  data: T[];
  meta: IMeta;
}

const Table = <T extends IRow>({
  columns = [],
  data = [],
  meta: { beforeCursor, afterCursor, totalCount, orderBy, pageSize }
}: IProps<T>) => {
  const router = useRouter();
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

  const goToPrev = () => {
    const { query, pathname } = router;

    router.push({
      pathname,
      query: { ...query, beforeCursor, afterCursor: null }
    });
  };

  const goToNext = () => {
    const { query, pathname } = router;

    router.push({
      pathname,
      query: { ...query, afterCursor, beforeCursor: null }
    });
  };

  return (
    <section className="relative w-full overflow-x-hidden">
      <div className="mx-auto px-4">
        <div
          className="bg-secondary overflow-x-scroll rounded-md border border-gray-200 p-5 shadow-sm md:w-full"
          data-aos="fade-up"
        >
          <table
            className="w-full table-auto border-collapse  text-left"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr className="border-b" {...headerGroup.getHeaderGroupProps()}>
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
          <nav className="flex w-full items-center justify-between">
            <p className="mt-1 text-base text-gray-600">
              <strong>Total: </strong> {totalCount} results
            </p>
            <ul className="list-style-none mt-2.5 flex">
              <li>
                <Button
                  onClick={goToPrev}
                  disabled={isNullOrUndefined(beforeCursor)}
                  label="Previous"
                />
              </li>
              <li>
                <Button
                  onClick={goToNext}
                  disabled={isNullOrUndefined(afterCursor)}
                  label="Next"
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Table;
