import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: false },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    courses: { type: [String], required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee",employeeSchema);
export default Employee;
