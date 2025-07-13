const express = require("express");
const cors = require("cors");
const BlogModel = require("./model");
require("./connection");

const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());

// Add new blog post
app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url, category } = req.body;
    const newBlog = new BlogModel({
      title,
      content,
      img_url,
      category
    });
    await newBlog.save();
    res.status(201).json({ message: "Blog post created successfully", blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating blog post", error: error.message });
  }
});

// Get all blog posts
app.get("/get", async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching blog posts", error: error.message });
  }
});

// Get single blog post by ID
app.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching blog post", error: error.message });
  }
});

// Update blog post
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, img_url, category } = req.body;
    
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, content, img_url, category },
      { new: true, runValidators: true }
    );
    
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    res.status(200).json({ message: "Blog post updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating blog post", error: error.message });
  }
});

// Delete blog post
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await BlogModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting blog post", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});