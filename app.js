const express = require("express");
const app = express();
const puerto = 3000;

const jwt = require('jsonwebtoken')
const SECRET_KEY = "CoNtRaSeNa sUpEr sEcReTa"

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use("/cart", async (req, res, next) => {
  try{
    const decoded = jwt.verify(req.headers.token, SECRET_KEY)
    console.log(decoded)
    next()
  } catch {
    res.status(401).json({messaje: 'Usuario no válido'})
  }
})

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



app.post("/login", (req, res) => {
  console.log(req.body)
  const username = req.body
  if(username){
    const token = jwt.sign({username}, SECRET_KEY)
    res.status(200).json({token: token})
  }else{
    res.status(401).json({message: "Algo salió mal"})
  }
})



app.listen(puerto, ()=>{
    console.log("servidor funcionando.");
});