const express = require("express");
const app = express();
const puerto = 3000;

app.get("/",(req,res)=>{
    res.send('<h1>bienvenido a el servidor</h1>');
});

/*const CATEGORIES_URL = require('./api/cats/cat.json');
const PRODUCTS_URL = require('./api/cats_products/');
const PRODUCT_INFO_URL = require('./api/products/');
const PRODUCT_INFO_COMMENTS_URL = require('./api/products_comments/');
const CART_INFO_URL = require('./api/user_cart/');
const CART_BUY_URL = require('./api/cart/buy.json');
const EXT_TYPE = '.json';*/


app.get("/cats", async (req, res) => {
    const CATEGORIES_URL = require('./api/cats/cat.json');
    res.json(CATEGORIES_URL);
  }
)

app.get("/sell", async (req, res) => {
    const PUBLISH_PRODUCT_URL = require('./api/sell/publish.json');
    res.json(CATEGORIES_URL);
  }
)

app.get("/products/:id", async (req, res) => {
    const PRODUCT_INFO_URL = require('./api/products/' + req.params.id);
    res.json(CATEGORIES_URL);
  }
)

app.get("/sell", async (req, res) => {
    const PUBLISH_PRODUCT_URL = require('./api/sell/publish.json');
    res.json(CATEGORIES_URL);
  }
)


app.listen(puerto, ()=>{
    console.log("servidor funcionando.");
});