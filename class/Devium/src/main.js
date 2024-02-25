const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectToDb = require("./utils/db");
const authRoutes = require("./routes/auth-routes");
const { sendMail } = require("./services/mail-service");
const errorHandler = require("./middlewares/Error.middleware");
const userAttachMiddleware = require("./middlewares/User.middleware");
const categoriesRoutes = require("./routes/categories-routes");
const postRoutes = require("./routes/posts-routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //for other form of data

const PORT = process.env.PORT || 5001;

app.get("/health", (req, res) => {
  res.send("ok");
});

app.use(authRoutes); //middleware
app.use("/categories", categoriesRoutes);
app.use("/posts", postRoutes);
app.use(userAttachMiddleware);

app.get("/test-email", async (req, res) => {
  try {
    await sendMail({
      to: "hi@gmail.com",
      subject: "test email",
      html: "<h1> Test email </h1>",
    });
    res.json({
      message: "Email sent",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: e.message,
      stack: e.stack,
    });
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server is running in port", PORT);
  connectToDb();
});
