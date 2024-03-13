import bcrypt from 'bcrypt';
import User from '../models/Users.js';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

let session;
const ObjectId = mongoose.Types.ObjectId;

const getUserControl = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find(
      {},
      {
        loginAttempts: 0,
        password: 0,
        createdAt: 0,
        updatedAt: 0,
        role: 0,
        email: 0,
        __v: 0,
      }
    );
    if (allUsers.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }
    res.json(allUsers);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createUserControl = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send('fields are missing.');
  }
  const { firstName, lastName, email, password, username } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    username,
    email,
    password,
  });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;
    await newUser.save();
    res
      .status(200)
      .json({ message: `user ${newUser.firstName} has been created.` });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.email) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOneUserControl = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const oneUser = await User.findOne(
      { _id: new ObjectId(id) },
      {
        password: 0,
        loginAttempts: 0,
        createdAt: 0,
        updatedAt: 0,
        email: 0,
        __v: 0,
        role: 0,
      }
    );
    if (!oneUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(oneUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Invalid ID" });
  }
};

const editUserControl = async (req: Request, res: Response) => {
  const { firstName, lastName } = req.body;
  const { id } = req.params;
  try {
    const updateOneUser = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    });
    if (!updateOneUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res
      .status(200)
      .json({ message: `Changes has been made to the user ${id}` });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUserControl = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (req.session.role === "admin" || req.session.userID == id) {
      await User.findByIdAndDelete(id);
      req.session.destroy((err) => {
        if (err) {
          console.log('unable to log out');          
          console.error(err);          
        }
      });
      return res
        .status(200)
        .json({ message: `User ${id} has been successfully deleted` });
    }
    return res.status(403).json({ message: "403! Forbidden!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const auth = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    if (username != "" && password != "") {
      const findUser = await User.findOne({ username });
      if (!findUser) {
        return res
          .status(400)
          .json({ message: "Invalid Username or Password" });
      }
      if (findUser.loginAttempts >= 10) {
        return res.status(400).json({
          message:
            "Account Locked, Max attempts reached, go to /help for more info",
        });
      }
      const comparePass = await bcrypt.compare(password, findUser.password);
      if (!comparePass) {
        findUser.loginAttempts += 1;
        await findUser.save();
        return res.status(400).json({ message: "Wrong username or password!" });
      }
      session = req.session;
      session.userID = findUser._id;
      session.role = findUser.role;
      session.user = findUser.username;
      session.fullName = findUser.firstName + " " + findUser.lastName;
      findUser.loginAttempts = 0;
      await findUser.save();
      return res
        .status(200)
        .json({ message: `Logged in successfull, Hello ${findUser.username}` });
    } else {
      res.status(403).json({ message: "Please fill all fields" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('unable to log out');          
      console.error(err);          
    }
  });
  res.redirect("/");
};

const notFound = (req: Request, res: Response) => {
  res.status(404).json({ message: "404 Page/Path Not Found!" });
};

export {
  getUserControl,
  createUserControl,
  getOneUserControl,
  editUserControl,
  deleteUserControl,
  auth,
  logout,
  notFound,
};
