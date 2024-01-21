import { Schema, model, models } from "mongoose";

const ExtraPriceSchema = new Schema({
  name:String,
  price:Number
})

const MenuItemSchema = new Schema(
  {
    name : {type:String},
    description : {type:String},
    basePrice: {type:Number},
    image : {type:String},
    sizes: {type:[ExtraPriceSchema]},
  extraIngredientsPrices:{type:[ExtraPriceSchema]}
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
