const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// ✅ Import MySQL connection
const db = require("./db");

const mostSellingRoutes = require("./routes/mostSellingRoutes");
const heroRoutes = require("./routes/heroRoutes");
const shopPerfumesRoutes = require("./routes/shopPerfumesRoutes");
const contactRoutes = require("./routes/contactRoutes");
const perfumesRoutes = require("./routes/perfumesRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const wishlistRoutes = require('./routes/wishlist');
const cart = require('./routes/cart');
const checkoutRoute = require('./routes/CheckoutPage');
const addressesRouter = require('./routes/addresses');
const adminlogin = require('./routes/adminLogin');

const app = express();
const PORT = 3001;

// ✅ Enable CORS and body parsing
app.use(cors());
app.use(bodyParser.json());

// ✅ Serve uploaded images with proper headers
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  setHeaders: (res, filePath) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Cross-Origin-Resource-Policy", "cross-origin");

    if (filePath.endsWith(".jpeg") || filePath.endsWith(".jpg")) {
      res.set("Content-Type", "image/jpeg");
    } else if (filePath.endsWith(".png")) {
      res.set("Content-Type", "image/png");
    }
  }
}));

// ✅ Mount routes
app.use("/api/mostselling", mostSellingRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/shopperfumes", shopPerfumesRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/perfumes", perfumesRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cart);
app.use('/api/checkout', checkoutRoute(db)); // ✅ Pass db to checkout route
app.use('/api/addresses', addressesRouter(db));
app.use('/api/admin', adminlogin);




// ✅ Health check
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
