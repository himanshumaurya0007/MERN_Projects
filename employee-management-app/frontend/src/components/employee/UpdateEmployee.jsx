import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import { FaCamera } from "react-icons/fa6";

import employeeAPI from "../../services/employeeAPI";
import { employeeValidationSchema } from "../../validations/employeeValidationSchema";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, deptRes, stateRes] = await Promise.all([
          employeeAPI.getEmployeeById(id),
          employeeAPI.getDepartments(),
          employeeAPI.getStates(),
        ]);

        const emp = empRes.data;
        const deptOptions = deptRes.data.map((d) => ({
          value: d._id,
          label: d.name,
        }));

        setDepartments(deptOptions);
        setStates(stateRes.data);

        setInitialValues({
          profilePic: "",
          name: emp.name,
          email: emp.email,
          phone: emp.phone,
          gender: emp.gender,
          department: emp.department?._id || "",
          state: emp.state?._id || "",
          city: emp.city?._id || "",
          pincode: emp.pincode,
          address: emp.address,
          isPermanent: emp.isPermanent,
        });

        const cityRes = await employeeAPI.getCitiesByStateId(emp.state?._id);
        setCities(cityRes.data);

        if (emp.profilePic) setPreviewUrl(emp.profilePic);
      } catch (error) {
        setServerError("Failed to load employee data");
      }
    };

    fetchData();
  }, [id]);

  const handleStateChange = async (stateId, setFieldValue) => {
    setFieldValue("state", stateId);
    setFieldValue("city", "");
    try {
      const cityRes = await employeeAPI.getCitiesByStateId(stateId);
      setCities(cityRes.data || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleFileChange = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    setSelectedFile(file);
    setFieldValue("profilePic", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (values) => {
    console.log("Form submitted!", values); // add this
    setLoading(true);
    setServerError("");

    try {
      const formData = new FormData();

      if (selectedFile) formData.append("profilePic", selectedFile);

      Object.keys(values).forEach((key) => {
        if (key !== "profilePic") formData.append(key, values[key]);
      });

      await employeeAPI.updateEmployeeById(id, formData);
      navigate("/employees");
    } catch (error) {
      setServerError("Failed to update employee");
    } finally {
      setLoading(false);
    }
  };

  if (!initialValues) {
    return (
      <div className="text-center py-10 text-lg font-medium text-gray-600">
        Loading employee data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white p-10 rounded-2xl shadow-2xl border border-slate-200">
        <h2 className="text-4xl font-bold text-slate-800 mb-8 text-center tracking-tight">
          Update Employee
        </h2>

        {serverError && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-center text-red-600 font-medium mb-6">
            {serverError}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={employeeValidationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, isSubmitting }) => (
            <Form className="space-y-8">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  {/* Profile Image (Preview) */}
                  <img
                    src={previewUrl || "/assets/profile-user.png"} // ✅ fallback to default
                    alt="profile"
                    className="h-32 w-32 rounded-full object-cover border-4 border-blue-200 shadow-md cursor-pointer"
                    onClick={() =>
                      document.getElementById("updateProfilePicInput").click()
                    } // click image to upload
                  />

                  {/* Hover Overlay */}
                  <div
                    className="absolute inset-0 bg-[#00000077] bg-opacity-50 rounded-full flex items-center justify-center
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={() =>
                      document.getElementById("updateProfilePicInput").click()
                    }
                  >
                    <FaCamera className="text-white text-2xl" />
                  </div>

                  {/* Hidden File Input */}
                  <input
                    id="updateProfilePicInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                  />
                </div>

                <p className="text-slate-500 text-sm mt-3">Update Profile Picture</p>

                {/* Error Message (Formik Validation) */}
                <ErrorMessage
                  name="profilePic"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              {/* Row 1: Name | Email | Phone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-medium text-slate-600 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="name"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-600 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-600 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="phone"
                    type="text"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block font-medium text-slate-600 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6 mt-2">
                  {["MALE", "FEMALE", "OTHER"].map((g) => (
                    <label
                      key={g}
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <Field
                        type="radio"
                        name="gender"
                        value={g}
                        className="accent-blue-600"
                      />
                      {g}
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Department | State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-slate-600 mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={departments}
                    value={departments.find(
                      (d) => d.value === values.department
                    )}
                    onChange={(selected) =>
                      setFieldValue(
                        "department",
                        selected ? selected.value : ""
                      )
                    }
                    placeholder="Select Department..."
                    isClearable
                    classNamePrefix="react-select"
                  />
                  <ErrorMessage
                    name="department"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-600 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="state"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    onChange={
                      (e) => handleStateChange(e.target.value, setFieldValue)
                      // handleStateChange(stateId, setFieldValue)
                    }
                    value={values.state}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state._id} value={state._id}>
                        {state.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* City | Pincode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-slate-600 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="city"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city._id} value={city._id}>
                        {city.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-600 mb-1">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="pincode"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <ErrorMessage
                    name="pincode"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block font-medium text-slate-600 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <Field
                  as="textarea"
                  name="address"
                  rows="3"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Is Permanent */}
              <div className="flex items-center gap-3">
                <Field
                  type="checkbox"
                  name="isPermanent"
                  className="accent-blue-600 w-4 h-4"
                />
                <label className="font-medium text-slate-700">
                  Is Permanent Employee?
                </label>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => navigate("/employees")}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-500 text-white rounded-lg shadow hover:bg-slate-600 transition-all text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className={`w-full sm:w-auto px-6 py-2 rounded-lg text-white font-semibold shadow transition text-sm ${
                    loading || isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {loading || isSubmitting
                    ? "Updating Employee..."
                    : "Update Employee"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateEmployee;
