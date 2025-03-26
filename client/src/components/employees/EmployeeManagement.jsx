import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEmployees } from "../../redux/slice/employeeSlice";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";

function EmployeeManagement() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees({ page, limit: 10 }));
  }, [dispatch, page]);

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleFormSubmit = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="container mx-auto p-4">
      <EmployeeForm
        initialData={selectedEmployee || {}}
        isEditing={!!selectedEmployee}
        onFormSubmit={handleFormSubmit}
      />

      <EmployeeTable
        onEditEmployee={handleEditEmployee}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default EmployeeManagement;
