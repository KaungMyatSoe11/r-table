import React from "react";
import DataTable from "./_components/DataTable";
import StudentCreateForm from "./_components/StudentCreateForm";

const StudentListPage = () => {
  return (
    <div className="container mx-auto ">
      <div className="my-6">
        <StudentCreateForm />
      </div>
      <div>
        <DataTable />
      </div>
    </div>
  );
};

export default StudentListPage;
