const express = require("express");

const router = express.Router();
const {
  getUserControl,
  createUserControl,
  getOneUserControl,
  editUserControl,
  deleteUserControl,
  auth,
  logout,
  notFound,
} = require("../controllers/userController");

const checkAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(400).json({ message: "Please log in to continue" });
  }
};

router.get("/", checkAuth, getUserControl);

router.post("/", createUserControl);

router.get("/:id", checkAuth, getOneUserControl);

router.put("/:id", checkAuth, editUserControl);

router.delete("/:id", checkAuth, deleteUserControl);

router.post("/auth", auth);

router.post("/logout", logout);

router.get("*", notFound);

router.use((err, req, res, next) => {
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ message: "Unauthorized User!" });
  }
  next();
});

module.exports = router;
