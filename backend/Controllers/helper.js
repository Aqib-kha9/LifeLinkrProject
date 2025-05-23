import Employee from "../Models/employee.js";

const isEmailUnique = async (email, excludeEmployeeId = null) => {
  const query = { email: email };
  if (excludeEmployeeId) {
    query._id = { $ne: excludeEmployeeId }; 
  }
  const existing = await Employee.findOne(query);
  return !existing; 
};
export{isEmailUnique}