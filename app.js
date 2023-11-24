const express = require("express");
const app = express();
const puerto = 3000;

const cors = require('cors');
app.use(cors({
    origin: '*'
}));


app.get("/cart", async (req, res) => {
  const CART_BUY_URL = require('./api/cart/buy.json');
  res.json(CART_BUY_URL);
}
)

app.get("/cats", async (req, res) => {
    const CATEGORIES_URL = require('./api/cats/cat.json');
    res.json(CATEGORIES_URL);
  }
)

app.get("/cats-products/:id", async (req, res) => {
  const PRODUCT_INFO_URL = require('./api/cats_products/' + req.params.id + '.json');
  res.json(PRODUCT_INFO_URL);
}
)

app.get("/products/:id", async (req, res) => {
  const PRODUCT_URL = require('./api/products/' + req.params.id + '.json');
  res.json(PRODUCT_URL);
}
)

app.get("/products-comments/:id", async (req, res) => {
  const PRODUCT_INFO_COMMENTS_URL = require('./api/products_comments/' + req.params.id + '.json');
  res.json(PRODUCT_INFO_COMMENTS_URL);
}
)

app.get("/sell", async (req, res) => {
    const PUBLISH_PRODUCT_URL = require('./api/sell/publish.json');
    res.json(PUBLISH_PRODUCT_URL);
  }
)

app.get("/user-cart/:id", async (req, res) => {
    const CART_INFO_URL = require('./api/user_cart/' + req.params.id + '.json');
    res.json(CART_INFO_URL);
  }
)



app.listen(puerto, ()=>{
    console.log("servidor funcionando.");
});