import express from "express";
import connectDB from "./utils/db.js";
import { configDotenv } from "dotenv";
import dotenv from "dotenv";
import bodyParser from "express"
import userRouter from "./Routes/userRou.js"
import employeeRouter from "./Routes/employeeRou.js";
import cors from "cors";
const app = express()
const port = 3000
dotenv.config();
configDotenv();
app.use(bodyParser.json());
app.use(cors({
    origin: true,
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}))

connectDB();


app.use("/user",userRouter);
app.use("/employee",employeeRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})