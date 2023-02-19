const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const env = require("dotenv");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/orders");
const stripeRouter = require("./routes/stripe");

const { default: mongoose } = require("mongoose");
const app = express();

mongoose
  .connect(
    "mongodb+srv://clark:clarkjoseph@cluster0.nlj5tmh.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("___________MongoDB Connected____________"))
  .catch((err) => console.log("MongoDB Failed to connect with " + err));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

env.config();
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/orders", orderRouter);
app.use("/cart", cartRouter);
app.use("/stripe", stripeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
