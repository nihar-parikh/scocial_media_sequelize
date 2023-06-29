const express = require("express");
let bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const imageController = require("./controllers/imageController");
const videoController = require("./controllers/videoController");
const commentController = require("./controllers/commentController");
const tagController = require("./controllers/tagController");

const app = express();

const port = 8000;

app.use(bodyParser.json());

app.post("/api/v1/user/create", userController.addUser);
app.get("/api/v1/user/:userId", userController.getUser);

app.post("/api/v1/image/add", imageController.addImage);
app.get("/api/v1/image/all", imageController.getAllImages);

app.post("/api/v1/video/add", videoController.addVideo);
app.get("/api/v1/video/all", videoController.getAllVideos);

app.post("/api/v1/comment/add", commentController.addComment);
app.get("/api/v1/comment/all", commentController.getAllComments);

app.post("/api/v1/tag/add", tagController.addTag);
app.get("/api/v1/tag/all", tagController.getAllTags);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
