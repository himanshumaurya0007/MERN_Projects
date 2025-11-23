import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";

import employeeAPI from "../../services/employeeAPI";
import DeleteConfirmModal from "../utility/DeleteConfirmModal";

const EmployeeById = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch Employee Details
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const result = await employeeAPI.getEmployeeById(id);
        setEmployee(result.data);
      } catch (err) {
        setServerError(
          err.response?.data?.message || "Failed to load employee details."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  /** --------------------------
   *  Action Handlers
   * -------------------------- */
  const handleEdit = () => navigate(`/employees/${id}/edit`);
  const handleBack = () => navigate("/employees");

  const handleDelete = async () => {
    try {
      await employeeAPI.deleteEmployeeById(id);
      navigate("/employees"); // redirect after deletion
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Failed to delete employee."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-10 border border-slate-200">
        <h2 className="text-4xl font-bold text-slate-800 mb-10 text-center tracking-tight">
          Employee Details
        </h2>

        {/* Loading & Errors */}
        {loading && (
          <p className="text-center text-slate-500 animate-pulse">
            Loading employee...
          </p>
        )}
        {serverError && (
          <p className="text-center text-red-600 font-semibold">
            {serverError}
          </p>
        )}

        {/* Employee Details */}
        {!loading && !serverError && employee && (
          <div className="space-y-8">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <img
                src={
                  employee.profilePic && employee.profilePic.trim() !== ""
                    ? employee.profilePic
                    : "/assets/profile-user.png"
                }
                alt={`${employee.name}'s profile`}
                className="w-36 h-36 object-cover rounded-full border-4 border-blue-200 shadow-lg"
              />
            </div>

            {/* Tabular Format Details */}
            <div className="space-y-4 text-slate-700">
              {[
                { label: "Name", value: employee.name },
                { label: "Email", value: employee.email },
                { label: "Phone", value: employee.phone },
                { label: "Gender", value: employee.gender },
                {
                  label: "Department",
                  value: employee.department?.name || "-",
                },
                { label: "State", value: employee.state?.name || "-" },
                { label: "City", value: employee.city?.name || "-" },
                { label: "Pincode", value: employee.pincode },
                { label: "Address", value: employee.address },
                {
                  label: "Permanent",
                  value: (
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        employee.isPermanent
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {employee.isPermanent ? "Yes" : "No"}
                    </span>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 rounded-lg shadow-sm px-5 py-4 border border-slate-100"
                >
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide w-full sm:w-1/3">
                    {item.label}
                  </span>
                  <span className="text-slate-800 font-medium break-words mt-1 sm:mt-0 w-full sm:w-2/3">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-200">
              <button
                onClick={handleBack}
                className="w-full sm:w-auto px-4 py-2 bg-slate-500 text-white rounded-lg shadow hover:bg-slate-600 transition-all text-sm font-medium"
              >
                Back
              </button>

              <div className="flex gap-4 w-full sm:w-auto justify-end">
                <button
                  onClick={handleEdit}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all text-sm font-medium"
                >
                  <FaPenToSquare size={16} /> Edit
                </button>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-all text-sm font-medium"
                >
                  <FaTrash size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        title="Delete Employee"
        message={`Are you sure you want to delete employee "${employee?.name}"? This action cannot be undone.`}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default EmployeeById;
