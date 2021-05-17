const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/passport_local_auth_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Mongodb Connected");
});

module.exports = db;