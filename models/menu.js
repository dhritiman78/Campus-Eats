import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema({
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);
export default Menu;
