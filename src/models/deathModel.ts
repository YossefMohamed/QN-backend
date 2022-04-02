import mongoose from "mongoose";

interface IDeathSchema {
  name: string;
  date: Date;
}

const deathSchema = new mongoose.Schema<IDeathSchema>(
  {
    name: {
      required: true,
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Death = mongoose.model<IDeathSchema>("Death", deathSchema);

export default Death;
