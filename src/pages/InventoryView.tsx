/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInventoryData,
  deleteProduct,
  disableProduct,
  editProduct,
} from "../features/inventorySlice";
import { AppDispatch, RootState } from "../store";
import StatsWidget from "./StatsWidget";
import EditProductModal from "../components/EditProductModal";
import DeleteModal from "../components/DeleteModal";
import InventoryTable from "./InventoryTable";

interface InventoryViewProps {
  isAdmin: boolean;
}
interface Products {
  disabled: boolean;
  name: string;
  category: string;
  price: number | string;
  quantity: number;
  value: number | string;
}

const InventoryView: React.FC<InventoryViewProps> = ({ isAdmin }) => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state?.inventory?.products
  );
  const [selectedProduct, setSelectedProduct] = useState<string | any>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = (productId: any) => {
    setSelectedProduct(productId);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    dispatch(fetchInventoryData());
  }, [dispatch]);

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleSave = (updatedProduct: any) => {
    dispatch(editProduct(updatedProduct));
    setModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (selectedProduct !== null) {
      dispatch(deleteProduct(selectedProduct));
      setDeleteModalOpen(false);
    }
  };

  const handleToggleDisable = (productName: string) => {
    dispatch(disableProduct(productName)); // Toggle disabled state in Redux
  };

  const totalProducts = products.length;
  const totalValue = products.reduce((acc: number, product: Products) => {
    const numericValue =
      parseFloat(String(product.value).replace(/[^0-9.]/g, "")) || 0;
    return acc + numericValue;
  }, 0);
  const outOfStock = products.filter(
    (product: Products) => product.quantity === 0
  ).length;
  const uniqueCategories = new Set(
    products.map((product: Products) => product.category)
  ).size;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-5xl  mb-6">Inventory stats</h2>
      <StatsWidget
        totalProducts={totalProducts}
        totalValue={totalValue}
        outOfStock={outOfStock}
        uniqueCategories={uniqueCategories}
      />

      <InventoryTable
        products={products}
        isAdmin={isAdmin}
        openModal={openModal}
        handleToggleDisable={handleToggleDisable}
        openDeleteModal={openDeleteModal}
      />

      {isModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default InventoryView;
