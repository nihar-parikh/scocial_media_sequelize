const db = require("../models");
const Image = db.image;
const User = db.user;
const Comment = db.comment;
const Tag = db.tag;

const addImage = async (req, res) => {
  const { userId, title, url } = req.body;
  try {
    const newImage = await Image.create({ userId, title, url });
    res
      .status(200)
      .json({ message: "Image added successfully", image: newImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add image" });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.findAll({
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Comment,
          as: "comments",
        },
        {
          model: Tag,
          as: "tags",
        },
      ],
    });
    res
      .status(200)
      .json({ message: "Images fetched successfully", data: images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch images" });
  }
};

module.exports = {
  addImage,
  getAllImages,
};
