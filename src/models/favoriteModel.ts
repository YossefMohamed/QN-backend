import mongoose from "mongoose";
import { UserInterface } from "./userModel";

interface IAyah {
  text: string;
  number: number;
  englishText: string;
  type?: string;
  surah?: number;
  user: mongoose.PopulatedDoc<UserInterface>;
  surahName: string;
}

const favoriteSchema = new mongoose.Schema<IAyah>(
  {
    text: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    englishText: {
      type: String,
      required: true,
    },
    surah: {
      type: String,
      required: true,
    },

    surahName: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model<IAyah>("Favorite", favoriteSchema);

export default Favorite;
