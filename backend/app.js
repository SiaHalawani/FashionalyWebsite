const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/wardrobe", require("./routes/wardrobeRoutes"));
app.use("/api/wardrobe-items", require("./routes/itemRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/outfits", require("./routes/outfitRoutes"));
app.use("/api/collections", require("./routes/collectionRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/likes", require("./routes/likeRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/followers", require("./routes/followerRoutes"));
app.use("/upload", require("./routes/uploadRoute"));
app.use('/api/stories', require("./routes/storyRoutes"));
app.use('/api/highlights', require("./routes/highlightRoutes"));
app.use('/api/notifications', require("./routes/notificationRoutes"));

// Root route
app.get("/", (req, res) => {
  res.send("Fashionly Backend is Running!");
});

// Sequelize
const sequelize = require("./sequelize");

// Sync all models with the database
sequelize.sync()
  .then(() => {
    console.log("✅ Models have been synchronized successfully.");
  })
  .catch((err) => {
    console.error("❌ Error syncing models:", err);
  });

module.exports = app;
