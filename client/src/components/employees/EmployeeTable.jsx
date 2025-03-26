import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditIcon, TrashIcon } from "lucide-react";
import { deleteEmployee } from "../../redux/slice/employeeSlice";

function EmployeeTable({ onEditEmployee, setPage }) {
  const dispatch = useDispatch();
  const { employees, totalPages, currentPage } = useSelector(
    (state) => state.employees
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await dispatch(deleteEmployee(id));
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border px-4 py-2">{employee.name}</td>
                <td className="border px-4 py-2">{employee.email}</td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEditEmployee(employee)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-4 py-2 rounded ${
              pageNum === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmployeeTable;
