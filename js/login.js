let button = document.getElementById("loginbutton")
let password = document.getElementById("password")
let email = document.getElementById("email")
let aviso = document.getElementById("faltan_datos")
let contrasena_incorrecta = document.getElementById("contrasena_incorrecta")
console.log(localStorage)

contrasena_incorrecta.style.display = 'none'
aviso.style.display = 'none'
localStorage.setItem("userLoggedIn", false)

function toInicio (event){
    event.preventDefault()
    if (email.value != '' && password.value != ''){
        validarUser()
    }else{
        aviso.style.display = 'block'
        setTimeout(()=>{aviso.style.display = 'none'}, 5000)
    }
}

button.addEventListener("click", toInicio)

function validarUser(){
    if(localStorage.hasOwnProperty(email.value)){ // Si está registrado
        if( localStorage.getItem(email.value) == password.value){ // Si la contraseña coincide
            localStorage.setItem('userLoggedIn', true);
            localStorage.setItem('actualUser', email.value)
            location.href = 'index.html' // Se establece que hay una sesión abierta, cual es el usuario y redirexiona al índice
        }else{
            contrasena_incorrecta.style.display = 'block'
            setTimeout(()=>{contrasena_incorrecta.style.display = 'none'}, 5000)
        }
    }else{ // En caso de que no se haya registrado el email antes
        let nuevaCuenta = confirm("El email ingresado no ha sido registrado. Deseas crear una cuenta?") // Pregunta si quiere crear cuenta
        if(nuevaCuenta){ // Si quiere crear una cuenta lo redirije a la página correspondiente
            location.href = 'sign-up.html'
        }else{ // Si no quiere crear una cuenta reseetea los valores
            email.value = null;
            password.value = null;
        }
    }
}