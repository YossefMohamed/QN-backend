import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface UserInterface extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  img: string;
  fullName: string;
  gander: string;
  matchPassword: (enteredPassword: string) => boolean;
}

const userSchema: Schema<any> = new mongoose.Schema<any>(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, "Please Enter Your Email !"],
    },
    gander: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password Must Be More Than 8 Chars !"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    img: {
      type: String,
      default: "static/img/default.jpg",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

userSchema.virtual("fullName").get(function (this: UserInterface) {
  return `${this.name} ${this.lastName}`;
});

userSchema.virtual("favorite", {
  ref: "Favorite",
  localField: "_id",
  foreignField: "user",
});
// const schema = new Schema<IUser, UserModel>({ name: String });

userSchema.pre("save", async function (this, next: any) {
  this.img = `https://avatars.dicebear.com/api/${this.gander}/${this.name}-${this.lastName}.svg`;
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

userSchema.pre(/^find/, function (this: any, next: any) {
  this.populate("favorite");
  next();
});
userSchema.methods.matchPassword = async function (
  this,
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;
