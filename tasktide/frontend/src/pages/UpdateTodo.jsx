import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaSave, FaSpinner, FaTasks } from 'react-icons/fa';
import todoApi from '../services/todoApi';

function UpdateTodo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        completed: false,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Fetch todo by ID on mount
    useEffect(() => {
        const fetchTodo = async () => {
            try {
                setLoading(true);
                const data = await todoApi.fetchTodoById(id);
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    completed: data.completed || false,
                });
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load todo.');
            } finally {
                setLoading(false);
            }
        };

        fetchTodo();
    }, [id]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            await todoApi.updateTodo(id, formData);
            navigate(`/${id}/view`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update todo.');
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return (
            <p className="flex animate-pulse items-center justify-center text-gray-600">
                {/* 🔹 Added pulse animation for loading state */}
                <FaSpinner className="mr-2 animate-spin" /> Loading todo...
            </p>
        );

    if (error)
        return (
            <p className="animate-shake text-center text-red-600">
                {/* 🔹 Added shake animation for error message */}

                {error}
            </p>
        );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-md duration-700">
            {/* 🔹 Fade + Slide in animation for main card */}

            <h2 className="animate-in zoom-in mb-6 flex items-center justify-center gap-2 text-center text-2xl font-bold duration-500">
                {/* 🔹 Zoom-in animation for header */}
                <FaEdit className="text-blue-600" /> Update Todo
            </h2>

            {/* Error message */}
            {error && (
                <p className="animate-shake mb-3 text-center text-sm text-red-600">
                    {/* 🔹 Shake animation when error is shown */}

                    {error}
                </p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="animate-in fade-in space-y-5 duration-700">
                {/* Title */}
                <div className="animate-in slide-in-from-left-4 duration-500">
                    {/* 🔹 Slide in from left for Title input */}

                    <label className="block flex items-center gap-2 font-medium text-gray-700">
                        <FaTasks className="text-gray-500" /> Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter todo title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Description */}
                <div className="animate-in slide-in-from-right-4 duration-500">
                    {/* 🔹 Slide in from right for Description input */}

                    <label className="block flex items-center gap-2 font-medium text-gray-700">
                        <FaEdit className="text-gray-500" /> Description
                    </label>
                    <textarea
                        name="description"
                        placeholder="Enter todo description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Completed checkbox */}
                <div className="animate-in fade-in flex items-center delay-200 duration-700">
                    {/* 🔹 Fade in with delay for checkbox */}

                    <input
                        type="checkbox"
                        name="completed"
                        checked={formData.completed}
                        onChange={handleChange}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="flex items-center gap-1 text-gray-700">
                        <FaTasks /> Mark as Completed
                    </label>
                </div>

                {/* Save button */}
                <button
                    type="submit"
                    disabled={saving}
                    className="animate-in fade-in flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-white transition-transform delay-300 duration-200 duration-700 hover:scale-105 active:scale-95 disabled:bg-gray-400"
                >
                    {/* 🔹 Hover/active scaling animation for button */}

                    {saving ? (
                        <>
                            <FaSpinner className="animate-spin" /> Updating...
                        </>
                    ) : (
                        <>
                            <FaSave /> Update Todo
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default UpdateTodo;
