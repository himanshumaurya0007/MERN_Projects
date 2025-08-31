import { FaExclamationTriangle, FaTrash, FaTimes } from 'react-icons/fa';

function DeleteModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            {/* 🔹 Backdrop Overlay with fade-in animation */}
            <div
                className="animate-in fade-in absolute inset-0 bg-black/50 duration-300"
                onClick={onClose}
            ></div>

            {/* 🔹 Modal Container with scale + fade animation */}
            <div className="animate-in zoom-in-95 fade-in relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-lg duration-500">
                {/* Close button (top-right) */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 transition hover:text-gray-600"
                >
                    <FaTimes size={18} />
                </button>

                {/* Header with animation */}
                <div className="animate-in slide-in-from-top-4 mb-4 flex items-center gap-3 duration-500">
                    <FaExclamationTriangle className="text-2xl text-red-500" />
                    <h2 className="text-xl font-bold text-gray-800">Delete Todo</h2>
                </div>

                {/* Message with fade-in */}
                <p className="animate-in fade-in mb-6 text-gray-600 duration-700">
                    Are you sure you want to delete this todo? This action cannot be undone.
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    {/* Cancel button with subtle animation */}
                    <button
                        onClick={onClose}
                        className="animate-in slide-in-from-left-4 rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition duration-500 hover:bg-gray-300"
                    >
                        Cancel
                    </button>

                    {/* Delete button with shake + hover scale */}
                    <button
                        onClick={onConfirm}
                        className="animate-in slide-in-from-right-4 flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-transform duration-200 duration-500 hover:scale-105 hover:bg-red-700 active:scale-95"
                    >
                        <FaTrash /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
