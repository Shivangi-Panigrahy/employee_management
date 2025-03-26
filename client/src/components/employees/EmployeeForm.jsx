import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  updateEmployee,
} from "../../redux/slice/employeeSlice";
import { fetchDepartments } from "../../redux/slice/departmentSlice";

function EmployeeForm({ initialData = {}, isEditing = false, onFormSubmit }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.employees);
  const { departments } = useSelector((state) => state.departments);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    department_id: "",
    dob: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0]; 
    return formattedDate;
  };

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        id: initialData.id || null,
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        department_id: initialData.department_id || "",
        dob: formatDate(initialData.dob) || "",
        salary: initialData.salary || "",
      });
    }
  }, [initialData, isEditing]);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";

    if (!formData.department_id)
      newErrors.department_id = "Department is required";

    if (!formData.dob) newErrors.dob = "Date of Birth is required";

    if (!formData.salary) newErrors.salary = "Salary is required";
    else if (
      isNaN(parseFloat(formData.salary)) ||
      parseFloat(formData.salary) <= 0
    )
      newErrors.salary = "Salary must be a positive number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const formattedValue = name === "dob" ? formatDate(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      email: "",
      phone: "",
      department_id: "",
      dob: "",
      salary: "",
    });
    setErrors({});
    onFormSubmit && onFormSubmit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        isEditing
          ? await dispatch(
              updateEmployee({ id: formData.id, employeeData: formData })
            )
          : await dispatch(addEmployee(formData));
        resetForm();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        disabled={loading}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )}
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs italic">{errors.phone}</p>
              )}
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Department
              <select
                name="department_id"
                value={formData.department_id}
                onChange={handleInputChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                  errors.department_id ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.department_id && (
                <p className="text-red-500 text-xs italic">
                  {errors.department_id}
                </p>
              )}
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date of Birth
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                  errors.dob ? "border-red-500" : ""
                }`}
              />
              {errors.dob && (
                <p className="text-red-500 text-xs italic">{errors.dob}</p>
              )}
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Salary
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                  errors.salary ? "border-red-500" : ""
                }`}
              />
              {errors.salary && (
                <p className="text-red-500 text-xs italic">{errors.salary}</p>
              )}
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button 
            type="submit" 
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? "Update Employee" : "Add Employee"}
          </button>
          <button 
            type="button" 
            onClick={resetForm}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;