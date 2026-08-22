import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

dotenv.config();

const categories = [
  {
    name: "Wool Rugs",
    slug: "wool-rugs",
    description: "Soft, durable rugs made from natural wool",
    image: "https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?w=600",
  },
  {
    name: "Persian Carpets",
    slug: "persian-carpets",
    description: "Intricate, traditional hand-knotted carpets",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80",
  },
  {
    name: "Jute Rugs",
    slug: "jute-rugs",
    description: "Natural fiber rugs, eco-friendly and textured",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
  },
  {
    name: "Runners",
    slug: "runners",
    description: "Long narrow rugs for hallways and staircases",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80",
  },
];

const productTemplates = [
  {
    name: "Handwoven Wool Rug",
    description: "A soft, durable wool rug perfect for living rooms. Hand-knotted by skilled artisans using traditional techniques.",
    price: 8999,
    type: "rug",
    material: "100% Wool",
    size: "5x7 ft",
    colors: ["Beige", "Brown"],
    images: ["https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?w=800"],
    stock: 12,
    featured: true,
    categorySlug: "wool-rugs",
  },
  {
    name: "Classic Persian Medallion Carpet",
    description: "A timeless Persian-style carpet with an intricate medallion pattern, woven with fine detail and rich color depth.",
    price: 24999,
    type: "carpet",
    material: "Silk Blend",
    size: "8x10 ft",
    colors: ["Red", "Navy", "Gold"],
    images: ["https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80"],
    stock: 5,
    featured: true,
    categorySlug: "persian-carpets",
  },
  {
    name: "Natural Jute Area Rug",
    description: "An eco-friendly jute rug with natural texture, perfect for adding warmth to minimalist spaces.",
    price: 3499,
    type: "rug",
    material: "100% Jute",
    size: "4x6 ft",
    colors: ["Natural"],
    images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"],
    stock: 20,
    featured: true,
    categorySlug: "jute-rugs",
  },
  {
    name: "Woven Hallway Runner",
    description: "A long, durable runner ideal for hallways and staircases, with a subtle geometric pattern.",
    price: 2999,
    type: "rug",
    material: "Cotton Blend",
    size: "2.5x8 ft",
    colors: ["Grey", "Ivory"],
    images: ["https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80"],
    stock: 15,
    featured: false,
    categorySlug: "runners",
  },
  {
    name: "Plush Wool Shag Rug",
    description: "Extra soft, high-pile wool rug that feels luxurious underfoot — great for bedrooms.",
    price: 10999,
    type: "rug",
    material: "100% Wool",
    size: "6x9 ft",
    colors: ["Cream"],
    images: ["https://images.unsplash.com/photo-1615529162924-f8605388461d?w=800&q=80"],
    stock: 8,
    featured: false,
    categorySlug: "wool-rugs",
  },
  {
    name: "Wall-to-Wall Berber Carpet",
    description: "Permanent, wall-to-wall Berber-style carpet flooring — thick loop pile for comfort and durability.",
    price: 45999,
    type: "carpet",
    material: "Nylon Blend",
    size: "Custom (per sq ft)",
    colors: ["Grey", "Beige"],
    images: ["https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80"],
    stock: 3,
    featured: true,
    categorySlug: "persian-carpets",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing categories and products");

    const createdCategories = await Category.insertMany(categories);
    console.log(`Inserted ${createdCategories.length} categories`);

    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id;
    });

    const productsToInsert = productTemplates.map(({ categorySlug, ...rest }) => ({
      ...rest,
      category: categoryMap[categorySlug],
    }));

    const createdProducts = await Product.insertMany(productsToInsert);
    console.log(`Inserted ${createdProducts.length} products`);

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();