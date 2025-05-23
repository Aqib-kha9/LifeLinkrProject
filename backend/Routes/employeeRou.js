import express from "express";
import multer from "multer";
import { createEmployee,updateEmployee,getEmployees, deleteEmployee } from "../Controllers/employeeCon.js";
import { storage } from "../utils/cloudinary.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
const upload = multer({storage});

//create Employee
router.post("/create",authMiddleware,upload.single("image"),createEmployee);

//update Employee
router.put("/:id/update",authMiddleware,upload.single("image"),updateEmployee);

//get Employee
router.get("/get",authMiddleware,getEmployees);

//delete Employee by id
router.delete("/delete/:id",authMiddleware,deleteEmployee);

export default router;