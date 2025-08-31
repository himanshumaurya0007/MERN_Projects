import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaClock, FaArrowLeft, FaEdit } from 'react-icons/fa';
import todoApi from '../services/todoApi';

function TodoDetail() {
    const { id } = useParams(); // get todo ID from URL
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                setLoading(true);
                const data = await todoApi.fetchTodoById(id);
                setTodo(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load todo.');
            } finally {
                setLoading(false);
            }
        };

        fetchTodo();
    }, [id]);

    if (loading) return <p className="text-center text-gray-600">Loading todo...</p>;

    if (error) return <p className="text-center text-red-600">{error}</p>;

    if (!todo) return <p className="text-center text-gray-500">Todo not found.</p>;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-5 mx-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-md duration-500">
            {' '}
            {/* 🔹 Card container animation */}
            <h2 className="animate-in fade-in zoom-in-50 mb-6 text-center text-2xl font-bold delay-100 duration-700">
                {' '}
                {/* 🔹 Heading zoom-in */}
                📝 Todo Details
            </h2>
            {/* Title */}
            <h3
                className={`animate-in fade-in slide-in-from-left-5 flex items-center gap-2 text-xl font-semibold delay-200 duration-500 ${todo.completed ? 'text-gray-500 line-through' : ''} `}
            >
                {' '}
                {/* 🔹 Title slides in */}
                {todo.completed ? (
                    <FaCheckCircle className="text-green-500" />
                ) : (
                    <FaClock className="text-yellow-500" />
                )}
                {todo.title}
            </h3>
            {/* Description */}
            {todo.description && (
                <p className="animate-in fade-in mt-3 leading-relaxed text-gray-700 delay-300 duration-500">
                    {' '}
                    {/* 🔹 Description fades in */}
                    {todo.description}
                </p>
            )}
            {/* Status */}
            <p className="animate-in fade-in slide-in-from-right-5 mt-4 flex items-center gap-2 delay-400 duration-500">
                {' '}
                {/* 🔹 Status slides in */}
                <span className="font-medium">Status:</span>
                {todo.completed ? (
                    <span className="flex items-center gap-1 font-semibold text-green-600">
                        <FaCheckCircle /> Completed
                    </span>
                ) : (
                    <span className="flex items-center gap-1 font-semibold text-yellow-600">
                        <FaClock /> Pending
                    </span>
                )}
            </p>
            {/* Timestamps */}
            <div className="animate-in fade-in mt-4 space-y-1 text-sm text-gray-500 delay-500 duration-500">
                {' '}
                {/* 🔹 Timestamps fade in */}
                <p>📅 Created: {new Date(todo.createdAt).toLocaleString()}</p>
                <p>⏱️ Updated: {new Date(todo.updatedAt).toLocaleString()}</p>
            </div>
            {/* Navigation */}
            <div className="mt-6 flex justify-between">
                <Link
                    to="/"
                    className="animate-in slide-in-from-left-5 flex transform items-center gap-2 rounded-lg bg-gray-500 px-4 py-2 text-white transition delay-600 duration-500 hover:scale-105 hover:bg-gray-600"
                >
                    {' '}
                    {/* 🔹 Back button slides from left */}
                    <FaArrowLeft /> Back
                </Link>

                <Link
                    to={`/${todo._id}/edit`}
                    className="animate-in slide-in-from-right-5 flex transform items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition delay-600 duration-500 hover:scale-105 hover:bg-blue-700"
                >
                    {' '}
                    {/* 🔹 Edit button slides from right */}
                    <FaEdit /> Edit
                </Link>
            </div>
        </div>
    );
}

export default TodoDetail;
