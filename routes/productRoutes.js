import express from "express";
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinaryConfig.js";
import upload from "../middleware/uploadMiddleware.js";
import fs from "fs";
import util from "util";

const router = express.Router();
const unlinkFile = util.promisify(fs.unlink);

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product with image upload
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const uploadedImages = [];

    // Upload images to Cloudinary
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
          use_filename: true,
        });

        // Remove local file after upload
        await unlinkFile(file.path);

        uploadedImages.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    }

    // Create product with image URLs
    const productData = {
      ...req.body,
      images: uploadedImages,
    };

    const product = new Product(productData);
    const newProduct = await product.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(400).json({ message: error.message });
  }
});

// Update product (with optional image update)
router.put("/:id", upload.array("images", 5), async (req, res) => {
  try {
    const productId = req.params.id;
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle image uploads
    const uploadedImages = [];
    if (req.files && req.files.length > 0) {
      // Remove existing Cloudinary images if any
      if (existingProduct.images && existingProduct.images.length > 0) {
        await Promise.all(
          existingProduct.images.map((img) =>
            cloudinary.uploader.destroy(img.publicId)
          )
        );
      }

      // Upload new images
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
          use_filename: true,
        });

        // Remove local file after upload
        await unlinkFile(file.path);

        uploadedImages.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    }

    // Prepare update data
    const updateData = {
      ...req.body,
      images:
        uploadedImages.length > 0 ? uploadedImages : existingProduct.images,
    };

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error("Product update error:", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete product and its images
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Remove images from Cloudinary
    if (product.images && product.images.length > 0) {
      await Promise.all(
        product.images.map((img) => cloudinary.uploader.destroy(img.publicId))
      );
    }

    // Delete product from database
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
