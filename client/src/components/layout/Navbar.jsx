import React from "react";
import { Home, Users, BarChart, Settings, Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Search Bar */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search employees, departments..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="ml-4 flex items-center space-x-4">
            {/* Notification Icon */}
            {/* <button className="text-gray-400 hover:text-gray-600 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400"></span>
            </button> */}

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <img
                className="h-8 w-8 rounded-full"
                src="/api/placeholder/32/32"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
