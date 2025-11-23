import React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/auth/ProtectedRoute";
import PublicRoute from "./utils/auth/PublicRoute";

import ProtectedLayout from "./components/utility/ProtectedLayout";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./components/auth/NotFound";

import AddEmployee from "./components/employee/AddEmployee";
import Employees from "./components/employee/Employees";
import EmployeeById from "./components/employee/EmployeeById";
import UpdateEmployee from "./components/employee/UpdateEmployee";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes with Nested Layout */}
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/new" element={<AddEmployee />} />
          <Route path="/employees/:id/view" element={<EmployeeById />} />
          <Route path="/employees/:id/edit" element={<UpdateEmployee />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
