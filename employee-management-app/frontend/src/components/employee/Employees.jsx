import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPenToSquare, FaTrash } from "react-icons/fa6";

import employeeAPI from "../../services/employeeAPI";
import DeleteConfirmModal from "../utility/DeleteConfirmModal";

const Employees = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await employeeAPI.getAllEmployees();
        setEmployees(result.data || []);
      } catch (err) {
        setServerError(
          err.response?.data?.message || "Failed to load employees."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  /** --------------------------
   * Action Handlers
   * -------------------------- */
  const handleView = (empId) => navigate(`/employees/${empId}/view`);
  const handleEdit = (empId) => navigate(`/employees/${empId}/edit`);

  // Open modal and store employee
  const openDeleteModal = (emp) => {
    setSelectedEmployee(emp);
    setShowDeleteModal(true);
  };

  // Actually delete after user confirms
  const confirmDelete = async () => {
    if (!selectedEmployee) return;
    try {
      await employeeAPI.deleteEmployeeById(selectedEmployee._id);
      setEmployees((prev) =>
        prev.filter((e) => e._id !== selectedEmployee._id)
      );
      setShowDeleteModal(false);
      setSelectedEmployee(null);
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-12">
      <div className="max-w-8xl mx-auto bg-white shadow-2xl rounded-xl p-10 border border-slate-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-slate-800 tracking-tight">
            Employees
          </h2>
          <button
            onClick={() => navigate("/employees/new")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-medium shadow-md"
          >
            + Add Employee
          </button>
        </div>

        {/* Loading / Error / Empty States */}
        {loading && (
          <p className="text-center text-slate-500 animate-pulse">
            Loading employees...
          </p>
        )}
        {serverError && (
          <p className="text-center text-red-600 font-semibold">
            {serverError}
          </p>
        )}
        {!loading && !serverError && employees.length === 0 && (
          <p className="text-center text-slate-500">No employees found.</p>
        )}

        {/* Table */}
        {!loading && !serverError && employees.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-lg overflow-hidden bg-white">
              <thead className="bg-slate-100 text-slate-600 text-sm uppercase font-semibold">
                <tr>
                  {[
                    "Name",
                    "Email",
                    "Phone",
                    "Gender",
                    "Department",
                    "State",
                    "City",
                    "Permanent",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="px-6 py-4 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {employees.map((emp, idx) => (
                  <tr
                    key={emp._id}
                    className="hover:bg-blue-50 transition-colors border-t border-slate-100"
                  >
                    <td className="px-6 py-4 font-medium">{emp.name}</td>
                    <td className="px-6 py-4">{emp.email}</td>
                    <td className="px-6 py-4">{emp.phone}</td>
                    <td className="px-6 py-4">{emp.gender}</td>
                    <td className="px-6 py-4">{emp.department?.name || "-"}</td>
                    <td className="px-6 py-4">{emp.state?.name || "-"}</td>
                    <td className="px-6 py-4">{emp.city?.name || "-"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                          emp.isPermanent
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {emp.isPermanent ? "Yes" : "No"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <button
                        onClick={() => handleView(emp._id)}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="View Details"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(emp._id)}
                        className="text-green-600 hover:text-green-800 transition"
                        title="Edit Employee"
                      >
                        <FaPenToSquare size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(emp)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete Employee"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Employees;
