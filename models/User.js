import mongoose,{ Schema, model, models } from "mongoose";
const UserSchema = new Schema(
  { 

    name: {type: String},
    email: { type: String, required: true, unique: true },
    image: {type: String},
    password: {
      type: String, required: true
    },
    userinfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserInfo' // Reference to the User model
    },
  },
  { timestamps: true }
);

export const User = models?.User || model('User', UserSchema);
