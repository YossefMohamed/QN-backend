import mongoose from "mongoose";

const connectDB = () => {
  console.log(process.env.MONGODBURI);
  mongoose
    .connect(process.env.MONGODBURI || "mongodb://localhost:27020/mydb")
    .then((e) => console.log("connected"))
    .catch((e) => console.log(e.message));
};

export default connectDB;
