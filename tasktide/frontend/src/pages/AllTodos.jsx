import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiEye, FiEdit, FiTrash2, FiList } from 'react-icons/fi';
import todoApi from '../services/todoApi';
import DeleteModal from '../components/DeleteModal'; // 🔹 Import custom modal

function AllTodos() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // 🔹 State for delete modal
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    // Fetch todos
    const fetchTodos = async () => {
        try {
            setLoading(true);
            const data = await todoApi.fetchTodos();
            setTodos(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch todos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // 🔹 Open modal instead of confirm()
    const openDeleteModal = (id) => {
        setSelectedTodoId(id);
        setModalOpen(true);
    };

    // 🔹 Confirm delete via modal
    const handleConfirmDelete = async () => {
        try {
            await todoApi.deleteTodo(selectedTodoId);
            setTodos((prev) => prev.filter((todo) => todo._id !== selectedTodoId));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete todo.');
        } finally {
            setModalOpen(false);
            setSelectedTodoId(null);
        }
    };

    // Toggle completion
    const handleToggleComplete = async (id, currentStatus) => {
        try {
            const updatedTodo = await todoApi.updateTodo(id, {
                completed: !currentStatus,
            });
            setTodos((prev) => prev.map((todo) => (todo._id === id ? updatedTodo : todo)));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update todo.');
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading todos...</p>;

    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="mx-auto w-full max-w-7xl px-1 sm:px-4">
            {/* Header with animation */}
            <h2 className="animate-in fade-in zoom-in-50 mb-8 flex items-center justify-center gap-2 text-center text-2xl font-bold text-gray-800 duration-700">
                {/* 🔹 Animated heading */}
                <FiList className="text-blue-600" size={26} />
                All Todos
            </h2>

            {todos.length === 0 ? (
                <p className="animate-in fade-in text-center text-gray-500 duration-500">
                    {/* 🔹 Empty state fades in */}
                    No todos found. Create one!
                </p>
            ) : (
                <ul className="mx-1 space-y-4 sm:mx-0">
                    {todos.map((todo, idx) => (
                        <li
                            key={todo._id}
                            className={`animate-in slide-in-from-bottom-5 fade-in flex flex-col items-start justify-between rounded-xl border border-gray-200 bg-white p-4 shadow duration-500 sm:flex-row sm:items-center delay-[${idx * 100}ms] `}
                        >
                            {/* Todo Info */}
                            <div className="mb-3 sm:mb-0">
                                <h3
                                    className={`text-lg font-semibold ${
                                        todo.completed
                                            ? 'text-gray-500 line-through'
                                            : 'text-gray-800'
                                    }`}
                                >
                                    {todo.title}
                                </h3>
                                {todo.description && (
                                    <p className="mt-1 text-sm text-gray-600">{todo.description}</p>
                                )}
                            </div>

                            {/* Actions with hover animations */}
                            <div className="flex flex-wrap gap-2">
                                {/* Toggle Complete */}
                                <button
                                    onClick={() => handleToggleComplete(todo._id, todo.completed)}
                                    title={
                                        todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'
                                    }
                                    className={`transform rounded-lg p-2 transition hover:scale-110 ${
                                        todo.completed
                                            ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                                            : 'bg-green-100 text-green-600 hover:bg-green-200'
                                    }`}
                                >
                                    {/* 🔹 Hover scale animation */}
                                    {todo.completed ? (
                                        <FiXCircle size={18} />
                                    ) : (
                                        <FiCheckCircle size={18} />
                                    )}
                                </button>

                                {/* View */}
                                <Link
                                    to={`/${todo._id}/view`}
                                    title="View Details"
                                    className="transform rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:scale-110 hover:bg-blue-200"
                                >
                                    {/* 🔹 Hover scale animation */}
                                    <FiEye size={18} />
                                </Link>

                                {/* Edit */}
                                <Link
                                    to={`/${todo._id}/edit`}
                                    title="Edit Todo"
                                    className="transform rounded-lg bg-indigo-100 p-2 text-indigo-600 transition hover:scale-110 hover:bg-indigo-200"
                                >
                                    {/* 🔹 Hover scale animation */}
                                    <FiEdit size={18} />
                                </Link>

                                {/* Delete */}
                                <button
                                    onClick={() => openDeleteModal(todo._id)} // 🔹 Use modal instead of confirm
                                    title="Delete Todo"
                                    className="transform rounded-lg bg-red-100 p-2 text-red-600 transition hover:scale-110 hover:bg-red-200"
                                >
                                    {/* 🔹 Hover scale animation */}
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* 🔹 Delete Modal Implementation */}
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default AllTodos;
