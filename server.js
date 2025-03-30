import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongo from "./connect/connect.js";
import userRouter from "./routes/routes.user.js";
dotenv.config();
connectToMongo();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
