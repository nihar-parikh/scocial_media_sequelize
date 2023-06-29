const e = require("express");
const { Op } = require("sequelize");
const db = require("../models");
const sequelize = db.sequelize;
const Image = db.image;
const User = db.user;
const Video = db.video;
const Comment = db.comment;
const Tag = db.tag;

const addVideo = async (req, res) => {
  const { userId, title, url } = req.body;
  try {
    const newVideo = await Video.create({ userId, title, url });
    res
      .status(200)
      .json({ message: "Video added successfully", data: newVideo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add video" });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
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
      .json({ message: "Videos fetched successfully", data: videos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch videos" });
  }
};

module.exports = {
  addVideo,
  getAllVideos,
};
