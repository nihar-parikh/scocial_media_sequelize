const db = require("../models");
const sequelize = db.sequelize;
const User = db.user;
const Image = db.image;
const Video = db.video;
const Comment = db.comment;
const Tag = db.tag;

const addUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
    });
    res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        model: Image,
        as: "images",
        include: [
          {
            model: Comment,
            as: "comments",
          },
          {
            model: Tag,
            as: "tags",
          },
        ],
      },
      {
        model: Video,
        as: "videos",
        include: [
          {
            model: Comment,
            as: "comments",
          },
          {
            model: Tag,
            as: "tags",
          },
        ],
      },
    ],
  });
  res.status(200).json(user);
};

module.exports = {
  addUser,
  getUser,
};
