import { Schema, model, models } from "mongoose";
const MenuItemSchema = new Schema(
  {
    name : {type:String},
    description : {type:String},
    basePrice: {type:Number},
    image : {type:String}
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);