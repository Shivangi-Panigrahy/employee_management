import React from "react";

const StatisticsPage = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800">
          Employee Statistics
        </h1>
        <p className="text-gray-500 mt-2">
          Insights and analytics about your workforce
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Example Statistics Cards */}
        {[
          { title: "Total Employees", value: "254" },
          { title: "New Hires", value: "12" },
          { title: "Departments", value: "8" },
          { title: "Average Tenure", value: "3.2 yrs" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            <h3 className="text-gray-500 text-sm mb-2">{stat.title}</h3>
            <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsPage;
