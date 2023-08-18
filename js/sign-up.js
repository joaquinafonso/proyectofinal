let button = document.getElementById("sign-up-button")
let password = document.getElementById("password")
let confirm_password = document.getElementById("confirm-password")
let email = document.getElementById("email")
let usuario_invalido = document.getElementById("usuario-registrado")
let faltan_datos = document.getElementById("faltan-datos")
let contrasena_incorrecta = document.getElementById("contrasena_incorrecta")
console.log(button)

faltan_datos.style.display = 'none'
usuario_invalido.style.display = 'none'
contrasena_incorrecta.style.display = 'none'

function toInicio (event){
    event.preventDefault()
    if (email.value != '' && password.value != ''){
        if (password.value == confirm_password){ // Si está todo bien sigue en validarUsario()
            validarUsuario()
        }else if(localStorage.hasOwnProperty(email.value)){ // Si el correo ya estaba registrado muestra una alerta
            usuario_invalido.style.display = 'block'
            setTimeout(()=>{usuario_invalido.style.display = 'none'}, 5000)
        }else if(password.value != confirm_password){ // Si las contraseñas ingresadas no son iguales muestra un alerta
            usuario_invalido.style.display = 'block'
            setTimeout(()=>{usuario_invalido.style.display = 'none'}, 5000)
        }
    }else{ // Si faltan datos muestra una alerta
        faltan_datos.style.display = 'block'
        setTimeout(()=>{ faltan_datos.style.display = 'none'}, 5000)
    }
}

button.addEventListener("click", toInicio)

function validarUser(){ // Se guardan los valores establecidos, establece que hay una sesión abierta y redirexiona al índice  
    localStorage.setItem(email.value, password.value)
    localStorage.setItem('userLoggedIn', true)
    location.href = 'index.html'      
}
