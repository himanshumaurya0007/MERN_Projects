import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/authUser.middleware.js";
import {
    validateCreateEmployee,
    validateUpdateEmployee
} from "../middlewares/validateEmployee.middleware.js";

import {
    getDepartments,
    getStates,
    getCitiesByStateId,
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployeeById,
    deleteEmployeeById
} from "../controllers/employee.controller.js";

const router = Router();

// Utility Routes
router.route('/departments')
    .get(
        verifyJWT,
        getDepartments
    );

router.route('/states')
    .get(
        verifyJWT,
        getStates
    );

router.route('/cities')
    .get(
        verifyJWT,
        getCitiesByStateId
    );

// CRUD Routes
router.route('/')
    .post(
        verifyJWT,
        upload.single("profilePic"),
        validateCreateEmployee,
        addEmployee
    );

router.route("/")
    .get(
        verifyJWT,
        getAllEmployees
    );

router.route("/:id")
    .get(
        verifyJWT,
        getEmployeeById
    );

router.route("/:id")
    .put(
        verifyJWT,
        upload.single("profilePic"),
        validateUpdateEmployee,
        updateEmployeeById
    );

router.route("/:id")
    .delete(
        verifyJWT,
        deleteEmployeeById
    );

export default router;