const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const productsRouter = require("./routes/admin/products");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["totalyawesomesecretyouwillneverguess"],
  })
);

app.use(authRouter);
app.use(productsRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
