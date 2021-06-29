require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
require("./Controllers/connectDb");

app.use(express.json());
app.use("/", express.static("public"));
app.use(fileUpload());

app.use("/user", require("./Routes/User"));
app.use("/items", require("./Routes/Item"));
app.use("/cart", require("./Routes/Cart"));

app.listen(process.env.PORT || 5000, () => console.log("Server is Live"));
