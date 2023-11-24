const CATEGORIES_URL = "http://localhost:3000/cats"
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let register = JSON.parse(localStorage.getItem('register'));


let registerEstructure = {
  isConected:false, 
  actualUser: {email: ''},
  users: [
    {
        email: 'admin',
        password: 'admin',
        name: 'Nombre',
        second_name: 'Segundo Nombre',
        lastname: 'Apellido',
        second_lastname: 'Segundo Apellido',
        phone: 'Teléfono',
        photo: 'Imagen'
    }
  ]
}

if(localStorage.getItem('cart') === null){
  localStorage.setItem('cart', '[]')
}
if(localStorage.getItem('register') === null || register.isConected === undefined){
  localStorage.setItem('register', JSON.stringify(registerEstructure))
}


const endSessionBtn = document.getElementById('endSession');
endSessionBtn.addEventListener('click', function () {
  register.isConected = false
  register.actualUser = '{}'
  localStorage.setItem('register', JSON.stringify(register))
  alert('Has cerrado sesión')
  location.href = 'login.html'
})

let actualUser = document.getElementsByClassName("username")
if(!/login\.html$/.test(window.location.pathname) && !/sign-up\.html$/.test(window.location.pathname)){
  if (!register.isConected){
    alert('Detectamos que no has iniciado sesión en este dispositivo. \n Da clic en aceptar para iniciar sesión. ')
    window.location.href = "login.html"
  } else {
    Array.prototype.forEach.call(
      actualUser,
      function (element) {
      if (element.nodeName == "A"){
          element.innerHTML = register.actualUser.email
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

function changeMode() {
  let actual = localStorage.getItem('actual-mode')
  if (actual == 'light') {
    document.body.classList.add("night-mode");
    localStorage.setItem("actual-mode", "dark");
  } else {
    document.body.classList.remove("night-mode");
    localStorage.setItem("actual-mode", "light");
  }
}

const mode = document.getElementById('formSwitch')

let actualMode = localStorage.getItem('actual-mode')
if(actualMode == undefined){
  actualMode = 'light'
  localStorage.setItem('actual-mode', 'light')
}else if(actualMode == 'dark'){
  document.body.classList.add("night-mode");
}

mode.addEventListener("click", changeMode);