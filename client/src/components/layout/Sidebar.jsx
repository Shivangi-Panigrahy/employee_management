import React, { useState } from "react";
import {
  Home,
  Users,
  BarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    // {
    //   icon: <Home className="h-5 w-5" />,
    //   label: "Dashboard",
    //   path: "/",
    // },
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
    // {
    //   icon: <Settings className="h-5 w-5" />,
    //   label: "Settings",
    //   path: "/settings",
    // },
  ];

  return (
    <div
      className={`
        bg-white border-r shadow-lg h-full transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Logo Area */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center">
            <img
              src="/api/placeholder/40/40"
              alt="Company Logo"
              className="h-10 w-10 mr-3"
            />
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

      {/* Navigation Menu */}
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

      {/* Bottom Section */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="bg-gray-100 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600">Upgrade to</p>
            <p className="text-sm font-semibold text-gray-800">Pro Version</p>
            <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded-md text-xs hover:bg-blue-600">
              Upgrade
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
