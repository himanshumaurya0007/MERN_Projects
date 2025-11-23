import mongoose from "mongoose";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { fields } from "../utils/fields.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { Employee } from "../models/employee.model.js";
import { Department } from "../models/department.model.js";
import { State } from "../models/state.model.js";
import { City } from "../models/city.model.js";

const getDepartments = asyncHandler(async (req, res, next) => {
    const departments = await Department.find().select('_id name');

    if (!departments || departments.length === 0) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "No departments found"
        );
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(
                StatusCodes.OK,
                departments,
                "Departments fetched successfully"
            ));
});

const getStates = asyncHandler(async (req, res) => {
    const states = await State.find().select('_id name');

    if (!states || states.length === 0) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "No states found"
        );
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(
                StatusCodes.OK,
                states,
                "States fetched successfully"
            ));
});

const getCitiesByStateId = asyncHandler(async (req, res) => {
    const { stateId } = req.query;

    if (!stateId) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "stateId is required"
        );
    }

    const cities = await City.find({ state: stateId }).select('_id name');

    if (!cities || cities.length === 0) {
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            `No cities found for stateId: ${stateId}`
        );
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(
                StatusCodes.OK,
                cities,
                "Cities fetched successfully"
            ));
});

const addEmployee = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED,
                ["User not authenticated"]
            );
        }

        const {
            name,
            email,
            phone,
            gender,
            department,
            address,
            city,
            state,
            pincode,
            isPermanent
        } = req.body;

        let profilePic;

        if (req.file) {
            const uploadResult = await uploadOnCloudinary(req.file.path);
            // console.log("Uploading file from path:", req.file.path);

            if (!uploadResult) {
                throw new ApiError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    "Failed to upload profile picture."
                );
            }
            profilePic = uploadResult.secure_url || uploadResult.url; // secure_url is preferred
        }

        const existingEmail = await Employee.findOne({ email: email.toLowerCase().trim() });

        // 1. Email already exists
        if (existingEmail) {
            throw new ApiError(
                StatusCodes.CONFLICT,
                "An employee with this email already exists."
            );
        }

        // 2. Validate department
        const departmentExists = await Department.findById(department);
        if (!departmentExists) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                `${fields.department} not found.`
            );
        }

        // 3. Validate state
        const stateExists = await State.findById(state);
        if (!stateExists) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                `${fields.state} not found.`
            );
        }

        // 4. Validate city and ensure it belongs to the state
        const cityExists = await City.findOne({ _id: city, state });
        if (!cityExists) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                `${fields.city} not found or does not belong to selected ${fields.state}.`
            );
        }

        // 5. Create employee
        const newEmployee = await Employee.create({
            profilePic,
            name,
            email,
            phone,
            gender,
            department,
            state,
            city,
            pincode,
            address,
            isPermanent: isPermanent || false,
        });

        return res.status(StatusCodes.CREATED).json(
            new ApiResponse(
                StatusCodes.CREATED,
                newEmployee,
                "Employee created successfully."
            ));
    } catch (error) {
        console.error(`Add employee failed: ${error.message}`, { stack: error.stack });

        next(
            error instanceof ApiError
                ? error
                : new ApiError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    ReasonPhrases.INTERNAL_SERVER_ERROR,
                    [error.message]
                ));
    }
});

const getAllEmployees = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user?._id;

        // 1. Ensure user is authenticated
        if (!userId) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED,
                ["User not authenticated"]
            );
        }

        // 2. Fetch all employees
        // Optional: populate department, state, and city names for clarity
        const employees = await Employee.find({})
            .populate("department", "name")
            .populate("state", "name")
            .populate("city", "name")
            .lean();

        // 3. Handle case when no employees exist
        if (!employees || employees.length === 0) {
            return res
                .status(StatusCodes.OK)
                .json(
                    new ApiResponse(
                        StatusCodes.OK,
                        [],
                        "No employees found."
                    ));
        }

        // 4. Send success response
        return res
            .status(StatusCodes.OK)
            .json(
                new ApiResponse(
                    StatusCodes.OK,
                    employees,
                    "Employees fetched successfully."
                ));
    } catch (error) {
        console.error(`Get all employees failed: ${error.message}`, { stack: error.stack });

        next(
            error instanceof ApiError
                ? error
                : new ApiError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    ReasonPhrases.INTERNAL_SERVER_ERROR,
                    [error.message]
                )
        );
    }
});

const getEmployeeById = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user?._id;

        // 1. Ensure user is authenticated
        if (!userId) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED,
                ["User not authenticated"]
            );
        }

        // 2. Extract employee ID from route params
        const { id } = req.params;

        if (!id) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Employee ID is required"
            );
        }

        // 3. Fetch employee by ID with populated refs
        const employee = await Employee.findById(id)
            .populate("department", "name")
            .populate("state", "name")
            .populate("city", "name")
            .lean();

        // 4. Handle employee not found
        if (!employee) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                `Employee not found with ID: ${id}`
            );
        }

        // 5. Return employee
        return res
            .status(StatusCodes.OK)
            .json(
                new ApiResponse(
                    StatusCodes.OK,
                    employee,
                    "Employee fetched successfully."
                ));
    } catch (error) {
        console.error(`Get employee by ID failed: ${error.message}`, { stack: error.stack });

        next(
            error instanceof ApiError
                ? error
                : new ApiError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    ReasonPhrases.INTERNAL_SERVER_ERROR,
                    [error.message]
                ));
    }
});

const updateEmployeeById = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return next(
                new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, [
                    "User not authenticated",
                ])
            );
        }

        const { id } = req.params;
        if (!id || !mongoose.isValidObjectId(id)) {
            return next(
                new ApiError(StatusCodes.BAD_REQUEST, "Invalid or missing Employee ID")
            );
        }

        console.log("Request body:", req.body);
        console.log("Request file:", req.file);
        console.log("Employee ID param:", req.params.id);

        const existingEmployee = await Employee.findById(id);
        if (!existingEmployee) {
            return next(
                new ApiError(
                    StatusCodes.NOT_FOUND,
                    `Employee not found with ID: ${id}`
                )
            );
        }

        const {
            name,
            email,
            phone,
            gender,
            department,
            address,
            city,
            state,
            pincode,
            isPermanent,
        } = req.body;

        // Validate email uniqueness
        if (
            email &&
            email.toLowerCase().trim() !== existingEmployee.email.toLowerCase()
        ) {
            const emailExists = await Employee.findOne({
                email: email.toLowerCase().trim(),
                _id: { $ne: id },
            });
            if (emailExists) {
                return next(
                    new ApiError(
                        StatusCodes.CONFLICT,
                        "Another employee with this email already exists."
                    )
                );
            }
        }

        // Validate referenced documents
        if (department && !mongoose.isValidObjectId(department)) {
            return next(
                new ApiError(StatusCodes.BAD_REQUEST, `${fields.department} is invalid`)
            );
        }
        if (department) {
            const departmentExists = await Department.findById(department);
            if (!departmentExists) {
                return next(
                    new ApiError(StatusCodes.BAD_REQUEST, `${fields.department} not found`)
                );
            }
        }

        if (state && !mongoose.isValidObjectId(state)) {
            return next(
                new ApiError(StatusCodes.BAD_REQUEST, `${fields.state} is invalid`)
            );
        }
        if (state) {
            const stateExists = await State.findById(state);
            if (!stateExists) {
                return next(
                    new ApiError(StatusCodes.BAD_REQUEST, `${fields.state} not found`)
                );
            }
        }

        if (city) {
            if (!mongoose.isValidObjectId(city)) {
                return next(
                    new ApiError(StatusCodes.BAD_REQUEST, `${fields.city} is invalid`)
                );
            }
            if (state) {
                const cityExists = await City.findOne({
                    _id: city,
                    state: state,
                });
                if (!cityExists) {
                    return next(
                        new ApiError(
                            StatusCodes.BAD_REQUEST,
                            `${fields.city} not found or does not belong to selected ${fields.state}`
                        )
                    );
                }
            }
        }

        // Handle profile picture upload
        let profilePic = existingEmployee.profilePic;
        if (req.file) {
            try {
                const uploadResult = await uploadOnCloudinary(req.file.path);
                if (!uploadResult) {
                    return next(
                        new ApiError(
                            StatusCodes.INTERNAL_SERVER_ERROR,
                            "Failed to upload profile picture"
                        )
                    );
                }
                profilePic = uploadResult.secure_url || uploadResult.url;
            } catch (err) {
                return next(
                    new ApiError(
                        StatusCodes.INTERNAL_SERVER_ERROR,
                        "Cloudinary upload failed",
                        [err.message]
                    )
                );
            }
        }

        // Update employee fields safely
        existingEmployee.name = name ?? existingEmployee.name;
        existingEmployee.email = email
            ? email.toLowerCase().trim()
            : existingEmployee.email;
        existingEmployee.phone = phone ?? existingEmployee.phone;
        existingEmployee.gender = gender ?? existingEmployee.gender;
        existingEmployee.department = department ?? existingEmployee.department;
        existingEmployee.state = state ?? existingEmployee.state;
        existingEmployee.city = city ?? existingEmployee.city;
        existingEmployee.pincode = pincode ?? existingEmployee.pincode;
        existingEmployee.address = address ?? existingEmployee.address;
        existingEmployee.isPermanent =
            typeof isPermanent !== "undefined"
                ? isPermanent === "true" || isPermanent === true
                : existingEmployee.isPermanent;
        existingEmployee.profilePic = profilePic;

        await existingEmployee.save();

        const updatedEmployee = await Employee.findById(id)
            .populate("department", "name")
            .populate("state", "name")
            .populate("city", "name")
            .lean();

        return res.status(StatusCodes.OK).json(
            new ApiResponse(
                StatusCodes.OK,
                updatedEmployee,
                "Employee updated successfully"
            )
        );
    } catch (error) {
        console.error("Update employee failed:", error);
        next(
            new ApiError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                [error.message]
            )
        );
    }
});


const deleteEmployeeById = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user?._id;

        // 1. Ensure user is authenticated
        if (!userId) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED,
                ["User not authenticated"]
            );
        }

        // 2. Extract employee ID from route params
        const { id } = req.params;

        if (!id) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Employee ID is required"
            );
        }

        // 3. Find the employee first
        const employee = await Employee.findById(id);

        if (!employee) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                `Employee not found with ID: ${id}`
            );
        }

        // 4. Optionally delete profile pic from server or cloud (if needed)
        // Example: if you saved the Cloudinary public_id, you could delete here.
        // if (employee.profilePicPublicId) {
        //     await deleteFromCloudinary(employee.profilePicPublicId);
        // }

        // 5. Delete employee record
        await Employee.findByIdAndDelete(id);

        // 6. Return response
        return res.status(StatusCodes.OK).json(
            new ApiResponse(
                StatusCodes.OK,
                null,
                "Employee deleted successfully."
            ));
    } catch (error) {
        console.error(`Delete employee by ID failed: ${error.message}`, { stack: error.stack });

        next(
            error instanceof ApiError
                ? error
                : new ApiError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    ReasonPhrases.INTERNAL_SERVER_ERROR,
                    [error.message]
                ));
    }
});

export {
    getDepartments,
    getStates,
    getCitiesByStateId,
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployeeById,
    deleteEmployeeById
};