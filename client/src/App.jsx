import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// Import components
import EmployeeManagement from './components/EmployeeManagement';
import Statistics from './components/Statistics';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Employee Management System</h1>
              <div className="space-x-4">
                <Link 
                  to="/" 
                  className="hover:bg-blue-700 px-3 py-2 rounded transition"
                >
                  Employees
                </Link>
                <Link 
                  to="/statistics" 
                  className="hover:bg-blue-700 px-3 py-2 rounded transition"
                >
                  Statistics
                </Link>
              </div>
            </div>
          </nav>

          <div className="container mx-auto mt-8 px-4">
            <Routes>
              <Route path="/" element={<EmployeeManagement />} />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;