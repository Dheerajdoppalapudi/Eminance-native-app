const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.ideasList = async (req, res) => {
  try {

    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    // console.log("Posts: ", posts)

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
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
