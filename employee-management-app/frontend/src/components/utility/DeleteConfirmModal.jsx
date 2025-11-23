import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const DeleteConfirmModal = ({
  isOpen,
  title = "Confirm Deletion",
  message = `Are you sure you want to delete this item? This action cannot be undone.`,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#00000077] flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        {/* Icon + Title */}
        <div className="flex flex-col items-center text-center">
          <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-2">{message}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
