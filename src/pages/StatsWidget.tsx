import React from "react";
import { FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";


const StatsWidget: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <div className="p-4 bg-green-900 rounded-lg text-white flex items-center space-x-4">
        <FaShoppingCart size={40} />
        <div>
          <p className="text-lg">Total product</p>
          <h3 className="text-3xl font-bold">Total Products</h3>
        </div>
      </div>

      <div className="p-4 bg-green-900 rounded-lg text-white flex items-center space-x-4">
        <FaDollarSign size={40} />
        <div>
          <p className="text-lg">Total store value</p>
          <h3 className="text-3xl font-bold">$123</h3>
        </div>
      </div>

      <div className="p-4 bg-green-900 rounded-lg text-white flex items-center space-x-4">
        <AiOutlineShoppingCart size={40} />
        <div>
          <p className="text-lg">Out of stocks</p>
          <h3 className="text-3xl font-bold">1</h3>
        </div>
      </div>

      <div className="p-4 bg-green-900 rounded-lg text-white flex items-center space-x-4">
        <MdCategory size={40} />
        <div>
          <p className="text-lg">No of Category</p>
          <h3 className="text-3xl font-bold">1</h3>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;
