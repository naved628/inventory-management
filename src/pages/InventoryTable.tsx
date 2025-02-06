import React from "react";
import { FaEdit, FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";

interface Product {
  name: string;
  category: string;
  price: string;
  quantity: number;
  value: string;
  disabled: boolean;
}

interface InventoryTableProps {
  products: Product[];
  isAdmin: boolean;
  openModal: (product: Product) => void;
  handleToggleDisable: (productName: string) => void;
  openDeleteModal: (productName: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  isAdmin,
  openModal,
  handleToggleDisable,
  openDeleteModal,
}) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-700">
      <table className="w-full border-collapse bg-gray-800">
        <thead>
          <tr className="bg-gray-700 text-left text-green-400">
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Value</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              className={`${
                product.disabled ? "opacity-50" : ""
              } border-b border-gray-700`}
            >
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3">{product.price}</td>
              <td className="p-3">{product.quantity}</td>
              <td className="p-3">{product.value.toLocaleString()}</td>
              <td className="p-3 text-center">
                <button
                  className={`mr-2 ${
                    isAdmin
                      ? "text-green-400 hover:text-green-300 cursor-pointer"
                      : "text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={!isAdmin}
                  onClick={() => isAdmin && openModal(product)}
                >
                  <FaEdit size={18} />
                </button>

                <button
                  className={`mr-2 ${
                    isAdmin
                      ? product.disabled
                        ? "text-gray-400 hover:text-gray-300 cursor-pointer"
                        : "text-gray-100 hover:text-gray-700 cursor-pointer"
                      : "text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={!isAdmin}
                  onClick={() => isAdmin && handleToggleDisable(product.name)}
                >
                  {product.disabled ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>

                <button
                  className={`${
                    isAdmin
                      ? "text-red-500 hover:text-red-400 cursor-pointer"
                      : "text-gray-600 cursor-not-allowed "
                  }`}
                  disabled={!isAdmin}
                  onClick={() => openDeleteModal(product.name)}
                >
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
