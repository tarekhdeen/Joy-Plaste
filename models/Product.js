import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    inStock: { type: Number, default: 0 },
    minimumOrderQuantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
