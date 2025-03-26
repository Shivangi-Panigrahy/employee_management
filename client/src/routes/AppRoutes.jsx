import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeesPage from "../pages/EmployeesPage";
import StatisticsPage from "../pages/StatisticsPage";
import Layout from "../components/layout/Layout";
import Statistics from "../components/Statistics";

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<EmployeesPage />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
