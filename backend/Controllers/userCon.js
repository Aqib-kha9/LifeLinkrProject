import User from "../Models/user.js";
import { comparePassword } from "../utils/hashPassword.js";
import jwt from "jsonwebtoken"
const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log(req.body);
    if(!password || !userName){
      return res.status(400).json({message:"Please send proper data",success:false});
    }

    let user = await User.findOne({ userName });

    //If user doesn't exist, create one
    if (!user) {
      user = await User.create({ userName, password });
      const token = jwt.sign({userId:user._id},"&@*!@^@#()$",{
            expiresIn: "20d"
        })
      return res.status(201).json({
        message: "New user registered successfully",
        success: true,
        token,
        user: {
          sno: user.sno,
          userName: user.userName,
        },
      });
    }

    //If user exists check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const token = jwt.sign({userId:user._id},"&@*!@^@#()$",{
            expiresIn: "20d"
    })

    //Successful login
    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        sno: user.sno,
        userName: user.userName,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export{login}