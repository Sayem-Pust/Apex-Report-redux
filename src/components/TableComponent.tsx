import React from "react";

interface TableColumn {
  header: string;
  accessor: string | ((row: any) => any);
  isCurrency?: boolean;
  dateFormat?: boolean;
  className?: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  striped?: boolean;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

const DataTable: React.FC<TableProps> = ({ columns, data, striped = true }) => {
  return (
    <div className="overflow-x-scroll">
      <table className="table-auto w-full border-separate border-spacing-1 border custom-table-data my-2">
        <thead className="text-center">
          <tr className="bg-[#2563EB99] bg-opacity-[60%] text-white">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`font-[600] text-[12px] px-2 py-3 uppercase ${
                  column.className || ""
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                striped && rowIndex % 2 === 0 ? "bg-white" : "bg-[#2563EB1A]"
              }
            >
              {columns.map((column, colIndex) => {
                const value =
                  typeof column.accessor === "function"
                    ? column.accessor(item)
                    : item[column.accessor];

                const displayValue = column.isCurrency
                  ? `$${value}`
                  : column.dateFormat
                  ? formatDate(value)
                  : value;

                return (
                  <td key={colIndex} className="custom-table-data px-2 py-3">
                    {displayValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
