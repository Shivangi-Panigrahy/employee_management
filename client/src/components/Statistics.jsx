import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchDepartmentSalaries, 
  fetchSalaryRanges, 
  fetchYoungestEmployees 
} from '../features/Slice/statsSlice';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

function Statistics() {
  const dispatch = useDispatch();
  const { 
    departmentSalaries, 
    salaryRanges, 
    youngestEmployees 
  } = useSelector(state => state.stats);

  useEffect(() => {
    dispatch(fetchDepartmentSalaries());
    dispatch(fetchSalaryRanges());
    dispatch(fetchYoungestEmployees());
  }, [dispatch]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Department Highest Salaries Bar Chart */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-bold mb-4">Department Highest Salaries</h2>
        <BarChart width={500} height={300} data={departmentSalaries}>
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="highest_salary" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Salary Range Pie Chart */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-bold mb-4">Salary Range Distribution</h2>
        <PieChart width={500} height={300}>
          <Pie
            data={salaryRanges}
            cx={250}
            cy={150}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="employee_count"
          >
            {salaryRanges.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend 
            formatter={(value, entry) => `${entry.payload.salary_range}: ${value}`} 
          />
        </PieChart>
      </div>

      {/* Youngest Employees Table */}
      <div className="bg-white shadow-md rounded p-4 md:col-span-2">
        <h2 className="text-xl font-bold mb-4">Youngest Employees by Department</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Age</th>
            </tr>
          </thead>
          <tbody>
            {youngestEmployees.map((emp, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{emp.department}</td>
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Statistics;