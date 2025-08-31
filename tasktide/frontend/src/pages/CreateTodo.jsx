import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlusCircle, FiFileText, FiType, FiLoader } from 'react-icons/fi'; // icons from react-icons
import todoApi from '../services/todoApi';

function CreateTodo() {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await todoApi.createTodo(formData); // Call API
            navigate('/'); // Redirect to all todos
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-5 mx-auto w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-lg duration-500">
            {' '}
            {/* 🔹 Form card slides in */}
            {/* Title Header */}
            <h2 className="animate-in fade-in zoom-in-50 mb-6 flex items-center justify-center gap-2 text-center text-2xl font-bold text-gray-800 delay-100 duration-700">
                {' '}
                {/* 🔹 Header fade + zoom */}
                <FiPlusCircle className="text-blue-600" size={28} />
                Create New Todo
            </h2>
            {/* Error Message */}
            {error && (
                <div className="animate-in fade-in slide-in-from-top-2 mb-4 flex items-center justify-center rounded-lg border border-red-300 bg-red-100 p-2 text-sm text-red-700 duration-300">
                    {' '}
                    {/* 🔹 Error smoothly appears */}
                    {error}
                </div>
            )}
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div className="animate-in fade-in slide-in-from-left-5 delay-200 duration-500">
                    {' '}
                    {/* 🔹 Title field slides in */}
                    <label className="mb-1 block font-medium text-gray-700">Title</label>
                    <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                        <FiType className="mr-2 text-gray-500" />
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter todo title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full focus:outline-none"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="animate-in fade-in slide-in-from-right-5 delay-300 duration-500">
                    {' '}
                    {/* 🔹 Description field slides in */}
                    <label className="mb-1 block font-medium text-gray-700">Description</label>
                    <div className="flex items-start rounded-lg border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                        <FiFileText className="mt-1 mr-2 text-gray-500" />
                        <textarea
                            name="description"
                            placeholder="Enter todo description (optional)"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full resize-none focus:outline-none"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="animate-in fade-in slide-in-from-bottom-5 flex w-full transform items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-white transition delay-400 duration-200 duration-500 hover:scale-105 hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {' '}
                    {/* 🔹 Button fades in last */}
                    {loading ? (
                        <>
                            <FiLoader className="animate-spin" size={20} />{' '}
                            {/* 🔹 Loading spinner animation */}
                            Creating...
                        </>
                    ) : (
                        <>
                            <FiPlusCircle size={20} />
                            Create Todo
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default CreateTodo;
