import React, { useState } from "react";
import {
  Users,
  BarChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      icon: <Users className="h-5 w-5" />,
      label: "Employees",
      path: "/",
    },
    {
      icon: <BarChart className="h-5 w-5" />,
      label: "Statistics",
      path: "/statistics",
    },
  ];

  return (
    <div
      className={`
        bg-white border-r shadow-lg h-full transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-20" : "w-64"}
      `}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">EMS</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-600 hover:text-gray-800"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      <nav className="mt-5">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center p-4 transition-colors duration-200
              ${
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100"
              }
              ${isCollapsed ? "justify-center" : "justify-start"}
            `}
          >
            {item.icon}
            {!isCollapsed && (
              <span className="ml-3 text-sm font-medium">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
