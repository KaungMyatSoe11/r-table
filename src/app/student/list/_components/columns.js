import ActionDropDown from "./ActionDropDown";

const { default: Major } = require("./Major");

const columns = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "major",
    accessorKey: "major",
    header: "Major",
    cell: ({ row }) => {
      console.log(row.original);

      return <Major student={row.original} />;
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => <ActionDropDown student={row.original} />,
  },
];

export default columns;
