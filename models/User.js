import { Schema, model, models } from "mongoose";
const UserSchema = new Schema(
  {
    name: {type: String},
    email: { type: String, required: true, unique: true },
    image: {type: String},
    password: {
      type: String, required: true
    },
    phone: {type: String},
    streetAddress: {type: String},
    postalCode:  {type: String},
    city: {type: String},
    country: {type: String},
    isAdmin: {type: Boolean, default:false}
  },
  { timestamps: true }
);

export const User = models?.User || model('User', UserSchema);
