const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  publishedAt: {
    type: Date,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: [Number],
  },
  likedBy: {
    type: [String]
  },
  comments: [
    {
      text: { type: String,
              required: true 
            },
      author: {
        type: String,
        required: true,
      },
      role: {
        type: String
      },
      createdTime: {
        type: Date,
        default: Date.now()
      },
      userId: {
        type: String,
      },
      editedAt: {
        type: Date,
        default: Date.now()
      }
    },
  ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;