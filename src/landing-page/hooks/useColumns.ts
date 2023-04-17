import { Column } from "react-table";

export interface IRow {
  id: string;
}

type ColumnTypes = object & IRow;

const useColumns = <T extends ColumnTypes>(columns: Column<T>[]) => {
  return columns;
};

export default useColumns;
