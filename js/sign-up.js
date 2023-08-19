document.addEventListener("DOMContentLoaded", ()=>{

let button = document.getElementById("signUpButton")
let password = document.getElementById("password")
let confirm_password = document.getElementById("confirm-password")
let email = document.getElementById("email")
let usuario_invalido = document.getElementById("usuario-registrado")
let faltan_datos = document.getElementById("faltan_datos")
let contrasena_repetida = document.getElementById("contrasena_incorrecta")


    button.addEventListener("click", registrarUsuario)
    
    faltan_datos.style.display = 'none'
    usuario_invalido.style.display = 'none'
    contrasena_repetida.style.display = 'none'


console.log(localStorage)



function registrarUsuario (event){
    event.preventDefault()
    if (email.value != '' && password.value != ''){
        if(localStorage.hasOwnProperty(email.value)){ // Si el correo ya estaba registrado muestra una alerta
            usuario_invalido.style.display = 'block'
            setTimeout(()=>{usuario_invalido.style.display = 'none'}, 5000)
        }else if(password.value != confirm_password.value){ // Si las contraseñas ingresadas no son iguales muestra un alerta
            contrasena_repetida.style.display = 'block'
            setTimeout(()=>{contrasena_repetida.style.display = 'none'}, 5000)
        }else if (password.value == confirm_password.value){ // Si está todo bien sigue en validarUsario()
            validarUsuario()
        }
    }else{ // Si faltan datos muestra una alerta
        faltan_datos.style.display = 'block'
        setTimeout(()=>{faltan_datos.style.display = 'none'}, 5000)
    }
}


function validarUsuario(){ // Se guardan los valores establecidos, establece que hay una sesión abierta, guarda cual es la sesión abierta y redirexiona al índice  
    localStorage.setItem(email.value, password.value)
    localStorage.setItem('userLoggedIn', true)
    localStorage.setItem('actualUser', email.value)
    location.href = 'index.html'      
}

})
