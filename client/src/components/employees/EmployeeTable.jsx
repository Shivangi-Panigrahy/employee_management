import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditIcon, TrashIcon, XIcon } from "lucide-react";
import { deleteEmployee } from "../../redux/slice/employeeSlice";

function EmployeeTable({ onEditEmployee, setPage }) {
  const dispatch = useDispatch();
  const { employees, totalPages, currentPage } = useSelector(
    (state) => state.employees
  );

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (employeeToDelete) {
      await dispatch(deleteEmployee(employeeToDelete.id));
      setDeleteModalOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  return (
    <>
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
                      onClick={() => openDeleteModal(employee)}
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

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeDeleteModal}
          ></div>
          <div className="relative w-auto max-w-lg mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-xl font-semibold">Confirm Delete</h3>
                <button
                  className="float-right p-1 ml-auto text-black bg-transparent border-0"
                  onClick={closeDeleteModal}
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="relative flex-auto p-6">
                <p className="my-4 text-lg leading-relaxed text-blueGray-500">
                  Are you sure you want to delete the employee{" "}
                  <span className="font-bold">{employeeToDelete?.name}</span>?
                </p>
                <p className="text-sm text-gray-500">
                  This action cannot be undone. The employee will be permanently
                  removed from the system.
                </p>
              </div>

              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                <button
                  className="px-6 py-2 mb-1 mr-4 text-sm font-bold text-gray-600 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                  type="button"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase bg-red-500 rounded shadow outline-none active:bg-red-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EmployeeTable;
