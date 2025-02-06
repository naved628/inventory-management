import React, { useState } from "react";
import InventoryView from "./pages/InventoryView";

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="flex flex-row-reverse items-center p-4 border-b border-gray-700">
        <div className="relative group">
          <button className="text-gray-400 hover:text-white cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h4a2 2 0 002-2v-8a2 2 0 00-2-2h-4a2 2 0 00-2 2v1"
              />
            </svg>
          </button>

          {/* Tooltip on Hover */}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Logout
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-lg">admin</span>
          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={!isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <div className="w-10 h-5 bg-gray-600 rounded-full peer peer-checked:bg-gray-400 after:absolute after:top-1 after:left-1 after:bg-yellow-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </label>
          <span className="text-lg">user</span>
        </div>
      </div>

      {/* Render Inventory View */}
      <InventoryView isAdmin={isAdmin} />
    </div>
  );
};

export default App;
