import Employee from "../Models/employee.js";
import { v4 as uuidv4 } from "uuid";
import {isEmailUnique} from "./helper.js"
const createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses } = req.body;
    const image = req.file ? req.file.path : null;
 
    const isUnique = await isEmailUnique(email);
    if (!isUnique) {
      return res.status(400).json({ message: "Email already exists", success: false });
    }
    const coursesArray = Array.isArray(courses) ? courses : [courses];

    const newEmployee = await Employee.create({
      id: uuidv4().slice(0, 6),
      image,
      name,
      email,
      mobile,
      designation,
      gender,
      courses: coursesArray,
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
      success: true,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req.file ? req.file.path : undefined;

    if (email) {
      const isUnique = await isEmailUnique(email, id);
      if (!isUnique) {
        return res.status(400).json({ message: "Email already exists", success: false });
      }
    }
    // Prepare fields to update only if they exist
    const updateFields = {
      ...(name && { name }),
      ...(email && { email }),
      ...(mobile && { mobile }),
      ...(designation && { designation }),
      ...(gender && { gender }),
      ...(course && { course }),
      ...(image && { image }),
    };

    
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,               
      updateFields,    
      { new: true }     
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found", success: false });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      updatedEmployee,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


const getEmployees = async (req, res) => {
  try {
    const {
      search = "",       
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
      status,
      startDate,
      endDate
    } = req.query;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { id: { $regex: search, $options: "i" } },
      ],
    };

    if (status === "active") query.isActive = true;
    if (status === "inactive") query.isActive = false;

    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); 
        query.createdAt.$lte = end;
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const employees = await Employee.find(query)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Employee.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      employees,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export { createEmployee,updateEmployee,getEmployees,deleteEmployee };
