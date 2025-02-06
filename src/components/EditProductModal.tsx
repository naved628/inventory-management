import React, { useState } from "react";

interface EditProductModalProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    value: number;
  };
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: unknown) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  if (!isOpen) return null;
  //to handle out the edit funtionality for price, quantity and values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Math.max(
      0,
      parseFloat(value.replace(/[^0-9]/g, "")) || 0
    );

    setEditedProduct((prev) => {
      const numericPrice = Math.floor(
        parseFloat(String(prev.price).replace(/[^0-9]/g, "")) || 0
      );
      const numericQuantity = Math.floor(
        parseFloat(String(prev.quantity)) || 0
      );

      if (name === "quantity") {
        const updatedQuantity = numericValue;
        const calculatedValue = updatedQuantity * numericPrice;

        return {
          ...prev,
          quantity: updatedQuantity,
          value: calculatedValue,
        };
      } else if (name === "price") {
        const updatedPrice = numericValue;
        const calculatedValue = updatedPrice * numericQuantity;

        return {
          ...prev,
          price: updatedPrice,
          value: calculatedValue,
        };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const handleSave = () => {
    const updatedProduct = {
      ...editedProduct,
      quantity: editedProduct.quantity,
      price: editedProduct.price,
      value: editedProduct.value,
    };

    onSave(updatedProduct);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-96 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit product</h2>
          <button
            onClick={onClose}
            className="text-purple-400 text-lg font-bold cursor-pointer"
          >
            ✖
          </button>
        </div>
        <p className="mb-4">{product.name}</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={editedProduct.category}
              disabled
              className="w-full bg-gray-700 text-white p-2 rounded-md disabled:bg-gray-900 disabled:text-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Price</label>
            <input
              type="string"
              name="price"
              value={editedProduct.price}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Quantity</label>
            <input
              type="string"
              name="quantity"
              value={editedProduct.quantity}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Value</label>
            <input
              type="text"
              name="value"
              disabled
              value={editedProduct.value}
              className="w-full p-2 rounded-md 
               bg-gray-800 text-gray-400 cursor-not-allowed 
               disabled:bg-gray-900 disabled:text-gray-200"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-6">
          <button
            onClick={onClose}
            className="text-yellow-300 hover:text-yellow-500 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSave()}
            className="px-4 py-2 rounded-md hover:bg-green-800 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
