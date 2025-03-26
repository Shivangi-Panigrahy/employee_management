import React from "react";
import { Search } from "lucide-react";
import userImage from "../../assets/userImage.png"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="ml-4 flex items-center space-x-4">

            <div className="flex items-center space-x-3">
              <img
                className="h-8 w-8 rounded-full"
                src={userImage}
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
