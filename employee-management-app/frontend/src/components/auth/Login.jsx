import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import authUserAPI from "../../services/authUserAPI";
import { useAuth } from "../../context/AuthContext";
import { authUserValidationSchema } from "../../validations/authUserValidationSchema";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // update global auth state
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setServerError("");
    setLoading(true);

    try {
      const res = await authUserAPI.loginUser(values);
      setUser(res.data.user);       // update context
      navigate("/employees");       // redirect to protected route
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-gray-100 px-4 py-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 tracking-tight">
          Welcome Back
        </h2>

        {serverError && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-center text-red-700 border border-red-200 font-medium">
            {serverError}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={authUserValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 shadow-sm"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-xs text-red-500 mt-1 font-medium"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 shadow-sm"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-xs text-red-500 mt-1 font-medium"
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className={`w-full py-3 rounded-lg text-white font-semibold shadow transition 
                    ${
                      loading || isSubmitting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {loading || isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-medium underline-offset-2 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
