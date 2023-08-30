const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let registerEstructure = {
  isConected:false, 
  actualUser: '-',
  users: {'admin': 'admin'}
}

if(localStorage.getItem('register') === null || localStorage.getItem('register').isConected === null){
  localStorage.setItem('register', JSON.stringify(registerEstructure))
}

let register = JSON.parse(localStorage.getItem('register'))
let actualUser = document.getElementsByClassName("username")
if(window.location.pathname != '/login.html' && window.location.pathname != '/sign-up.html'){
  if (!register || !register.isConected){
    alert('Detectamos que no has iniciado sesión en este dispositivo. \n Da clic en aceptar para iniciar sesión. ')
    window.location.href = "login.html"
  } else {
    Array.prototype.forEach.call(
      actualUser,
      function (element) {
      if (element.nodeName == "A"){
          element.innerHTML = register.actualUser
        }
      }
    )
  }
}

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}