import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  book_data,
  book_interface,
  param_interface,
} from "../interfaces/books";
import { DeleteButtonRenderer, EditButtonRenderer } from "./functions";

const BooksTable = ({ books }: { books: book_interface[] }) => {
  const gridRef: any = useRef(null);
  const [edOpen, setEdOpen] = useState(false);
  const [deOpen, setDeOpen] = useState(false);
  const [selected, setSelected] = useState<book_data>();
  const formatDate = (params: param_interface) => {
    return new Date(params.value).toLocaleDateString();
  };

  const onGridReady = () => {
    // const gridApi = gridRef.current.api;
  };

  const colDefs = [
    {
      headerName: "Added by",
      field: "email",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Book name",
      field: "title",
      filter: "agTextColumnFilter",
    },
    { field: "author" },
    { headerName: "Publish year", field: "publishYear" },
    {
      headerName: "Added date",
      field: "createdAt",
      valueFormatter: formatDate,
    },
    {
      headerName: "Last updated",
      field: "updatedAt",
      valueFormatter: formatDate,
    },
    {
      headerName: "Edit",
      cellRenderer: (params: param_interface) =>
        EditButtonRenderer(
          selected as any,
          setSelected,
          params,
          edOpen,
          setEdOpen
        ),
      colId: "edit",
    },
    {
      headerName: "Delete",
      cellRenderer: (params: param_interface) =>
        DeleteButtonRenderer(
          selected as any,
          setSelected,
          params,
          deOpen,
          setDeOpen
        ),
      colId: "delete",
    },
  ];

  return (
    <div
      className={"ag-theme-quartz-dark "}
      style={{
        width: "80%",
        height: "60vh",
      }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={books}
        columnDefs={colDefs}
        onGridReady={onGridReady}
        overlayLoadingTemplate={
          '<span class="no-data-loader">No data found</span>'
        }
        overlayNoRowsTemplate={
          "<div><button class='bg-transparant hover:bg-gray-100 text-white pointer  font-semibold py-2 px-4 border border-gray-400 rounded shadow'>No books present</button></div>"
        }
      />
    </div>
  );
};

export default BooksTable;
