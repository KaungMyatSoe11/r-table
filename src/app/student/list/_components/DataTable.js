"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";

const DataTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  //   const columns = [
  //     {
  //       id: "name",
  //       accessorKey: "name",
  //       header: "Name",
  //     },
  //     {
  //       id: "email",
  //       accessorKey: "email",
  //       header: "Email",
  //     },
  //     {
  //       id: "major",
  //       accessorKey: "major",
  //       header: "Major",
  //     },
  //   ];
  const columns = [
    {
      id: "title",
      accessorKey: "title",
      header: "Title",
    },
    {
      id: "price",
      accessorKey: "price",
      header: "Price",
    },
  ];
  const st_data = [
    { id: 1, name: "kms", email: "eduj@gmail.com", major: "eng" },
    { id: 2, name: "kms", email: "eduj@gmail.com", major: "eng" },
    { id: 3, name: "kms", email: "eduj@gmail.com", major: "eng" },
  ];

  //   const fetchAllStudents = async () => {
  //     const res = await fetch("https://st-api.kaungmyatsoe.dev/api/v1/students", {
  //       method: "GET",
  //       headers: {
  //         key:
  //           "43/UgWoJWW8pXKRmM48xYp8uuIXXLaBM1USAblj50X5GrVUdaluW36lEjoAbylSL 6m4g9OXOxb9p7teXUyph5w==",
  //       },
  //     });
  //     const data = await res.json();
  //     console.log(data);

  //     return data.students;
  //   };
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products", {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);

    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const table = useReactTable({
    data: !isLoading ? data.products : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  console.log(pagination);

  return (
    <div className="container mx-auto ">
      <div className="border my-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <div className="me-auto">
          <Button
            className="border rounded p-1"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
