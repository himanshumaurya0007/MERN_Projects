import baseApi from "./baseApi";

const todoApi = {
    // Fetch all todos
    fetchTodos: async () => {
        const response = await baseApi.get("/todos");
        return response.data;
    },

    // Create a new todo
    createTodo: async (todo) => {
        const response = await baseApi.post("/todos", todo);
        return response.data;
    },
    
    // Fetch a single todo by ID
    fetchTodoById: async (id) => {
        const response = await baseApi.get(`/todos/${id}`);
        return response.data;
    },
    
    // Update a todo by ID
    updateTodo: async (id, updatedTodo) => {
        const response = await baseApi.put(`/todos/${id}`, updatedTodo);
        return response.data;
    },
    
    // Delete a todo by ID
    deleteTodo: async (id) => {
        const response = await baseApi.delete(`/todos/${id}`);
        return response.data;
    }
};

export default todoApi;