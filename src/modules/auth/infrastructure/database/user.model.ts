import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: ["USER_ROLE", "ADMIN_ROLE"],
      default: ["USER_ROLE"],
    },
  },
  { timestamps: true },
);

export const UserModel = model("User", userSchema);
