import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchEmployees, 
  addEmployee, 
  updateEmployee, 
  deleteEmployee 
} from '../redux/actions/employeeActions';
import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react';

function EmployeeManagement() {
  const dispatch = useDispatch();
  const { employees, totalPages, currentPage } = useSelector(state => state.employees);
  
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    department_id: '',
    dob: '',
    salary: '',
    photo: null
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchEmployees(page));
  }, [dispatch, page]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) 
      newErrors.email = 'Email is invalid';
    
    if (!formData.phone) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) 
      newErrors.phone = 'Phone must be 10 digits';
    
    if (!formData.department_id) 
      newErrors.department_id = 'Department is required';
    
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    
    if (!formData.salary) newErrors.salary = 'Salary is required';
    else if (isNaN(parseFloat(formData.salary)) || parseFloat(formData.salary) <= 0)
      newErrors.salary = 'Salary must be a positive number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'photo') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      if (file) reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        if (isEditing) {
          await dispatch(updateEmployee(formData.id, formData));
        } else {
          await dispatch(addEmployee(formData));
        }
        
        // Reset form
        setFormData({
          id: null,
          name: '',
          email: '',
          phone: '',
          department_id: '',
          dob: '',
          salary: '',
          photo: null
        });
        
        setIsEditing(false);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await dispatch(deleteEmployee(id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Employee Form */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )}
            </label>
          </div>
          {/* Add similar input fields for email, phone, etc. with validation */}
          {/* Omitted for brevity, but would follow same pattern */}
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEditing ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>

      {/* Employee Grid */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border px-4 py-2">
                  {employee.photo && (
                    <img 
                      src={employee.photo} 
                      alt={employee.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="border px-4 py-2">{employee.name}</td>
                <td className="border px-4 py-2">{employee.email}</td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(employee)}
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

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-4 py-2 rounded ${
              pageNum === currentPage 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmployeeManagement;