const db = require("../models");
const Comment = db.comment;
const Image = db.image;
const Video = db.video;

const addComment = async (req, res) => {
  const { title, commentableId, commentableType } = req.body;
  try {
    const newComment = await Comment.create({
      title,
      commentableId,
      commentableType,
    });
    res
      .status(200)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

const getAllComments = async (req, res) => {
  const { commentableType } = req.body;

  try {
    if (commentableType !== "image" && commentableType !== "video") {
      return res.status(400).json({ error: "Invalid commentableType" });
    }

    const comments = await Comment.findAll({
      where: { commentableType },
      include: [
        {
          model: commentableType === "image" ? Image : Video,
          as: commentableType === "image" ? "image" : "video",
        },
      ],
    });

    res
      .status(200)
      .json({ message: "Comments fetched successfully", data: comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch comments" });
  }
};

module.exports = {
  addComment,
  getAllComments,
};
