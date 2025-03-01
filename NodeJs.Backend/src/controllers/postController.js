const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.ideasList = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    const updatedPosts = posts.map((post) => ({
      ...post,
      thumbnail: post.thumbnail
        ? `http://localhost:${process.env.PORT || 8000}${post.thumbnail}`
        : null,
    }));

    res.status(200).json(updatedPosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.createPosts = async (req, res) => {
  try {
    const { name, description } = req.body;
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !description) {
      return res.status(400).json({ error: "Name and Description are required" });
    }
    // console.log("req.user: ", req.user.userId)

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }
    // console.log("User ID:", req.user.userId); 

    const newPost = await prisma.post.create({
      data: {
        name,
        description,
        thumbnail,
        user: {
          connect: { id: req.user.userId },
        },
      },
    });

    res.status(201).json({
      message: "Post Created Successfully",
      post: newPost,
      thumbnail_url: newPost.thumbnail ? `http://localhost:8000${newPost.thumbnail}` : null,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Create Posts Failed" });
  }
};

exports.userPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("user Id: ", userId)

    const posts = await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    // console.log("user posts comming here:  ", posts)
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user posts" });
  }
};