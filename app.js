require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const LoginRoutes = require("./routes/login");
const UsersRoutes = require("./routes/users");
const PostsRoute = require("./routes/posts");
const UserPost = require("./routes/userpost");
// const GetSep = require("./routes/getsep");
// const Like = require("./routes/like");
// const Comment = require("./routes/comment");

app.use(cors());

const connection = require("./db");
const PORT = process.env.PORT

//for database connection
connection();


// middleware
app.use(express.json());
app.use(cors());

// Configure body-parser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use('/api/users',UsersRoutes)
app.use('/api/login',LoginRoutes);
app.use("/api/posts", PostsRoute);
app.use("/api/posts", UserPost);




app.listen(PORT,()=>{
    console.log("server is listening on PORT : "+ PORT)
})



