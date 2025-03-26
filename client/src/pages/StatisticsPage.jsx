import React from "react";
import Statistics from "../components/Statistics/Statistics";

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
        <Statistics/>
    </div>
  );
};

export default StatisticsPage;
