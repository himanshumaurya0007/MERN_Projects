import baseAPI from "./baseAPI";

const employeeAPI = {
    // -------- Utility Routes --------
    getDepartments: async () => {
        const { data } = await baseAPI.get("/v1/employee/departments");
        return data;
    },

    getStates: async () => {
        const { data } = await baseAPI.get("/v1/employee/states");
        return data;
    },

    getCitiesByStateId: async (stateId) => {
        const { data } = await baseAPI.get("/v1/employee/cities", {
            params: { stateId },
        });
        return data;
    },

    // -------- CRUD Routes --------
    addEmployee: async (formData) => {
        const { data } = await baseAPI.post("/v1/employee", formData);
        return data;
    },

    getAllEmployees: async () => {
        const { data } = await baseAPI.get("/v1/employee");
        return data;
    },

    getEmployeeById: async (id) => {
        const { data } = await baseAPI.get(`/v1/employee/${id}`);
        return data;
    },

    updateEmployeeById: async (id, formData) => {
        const { data } = await baseAPI.put(`/v1/employee/${id}`, formData);
        return data;
    },

    deleteEmployeeById: async (id) => {
        const { data } = await baseAPI.delete(`/v1/employee/${id}`);
        return data;
    },
};

export default employeeAPI;