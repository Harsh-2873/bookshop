const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");

const User = require("./routes/user");
const Books = require("./routes/book");
const category = require("./routes/cate");
const Favourite = require("./routes/favourites");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(cors())
app.use(express.json());
//routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", category);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

//Creating Port
app.listen(process.env.PORT, () => {
    console.log(`Server Started ${process.env.PORT}`);
});