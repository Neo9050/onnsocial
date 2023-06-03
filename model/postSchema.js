const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: {
        type: String,
        required: true,
      },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;



// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema({
//   text: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   // likes: [
//   //   {
//   //     type: String,
//   //   },
//   // ],
//   likes: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],
//   comments: [
//     {
//       text: {
//         type: String,
//         required: true,
//       },
//       userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         // required: true,
//       },
//     },
//   ],
// });

// const Post = mongoose.model("Post", postSchema);

// module.exports = Post;

