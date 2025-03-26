import React from "react";
import EmployeeManagement from "../components/employees/EmployeeManagement";

const EmployeesPage = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800">
          Employee Management
        </h1>
        <p className="text-gray-500 mt-2">
          Manage and track your organization's workforce
        </p>
      </header>
      <EmployeeManagement />
    </div>
  );
};

export default EmployeesPage;
