const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParse = require("cookie-parser");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}
const mongoConnection = require("./mongoConnection/mongoConnection");
const ProductRoute = require("./routes/ProductRoute");
const UserRoute = require("./routes/UserRoute");
const path = require("path");
// db connection ---------------------------------------------------
mongoConnection();
// db connection ---------------------------------------------------

app.use(cookieParse());

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:4000",
      credentials: true, //access-control-allow-credentials:true
      optionSuccessStatus: 200,
    })
  );
} else {
  app.use(cors());
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/ppg", ProductRoute);
app.use("/api/ppg", UserRoute);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "sunshine/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "sunshine/build/index.html"));
  });
}

app.listen(process.env.PORT || 4000, () => {
  console.log("Listen on port sunshineprem");
});
