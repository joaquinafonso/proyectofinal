let button = document.getElementById("loginbutton")
let password = document.getElementById("password")
let email = document.getElementById("email")
let missing_values = document.getElementById("faltan_datos")
let wrong_password = document.getElementById("contrasena_incorrecta")

wrong_password.style.display = 'none'
missing_values.style.display = 'none'

register.isConected = false;
localStorage.setItem("register", JSON.stringify(register))


function toMain (event){
    event.preventDefault()
    if (email.value != '' && password.value != ''){
        validateUser()
    }else{
        missing_values.style.display = 'block'
        setTimeout(()=>{missing_values.style.display = 'none'}, 5000)
    }
}

button.addEventListener("click", toMain)

function validateUser(){
    if(register.users.hasOwnProperty(email.value)){ // Si está registrado
        if( register.users[email.value] == password.value){ // Si la contraseña coincide
            register.isConected = true
            register.actualUser = email.value
            localStorage.setItem('register', JSON.stringify(register))
            location.href = 'index.html' // Se establece que hay una sesión abierta, cual es el usuario y redirexiona al índice
        }else{
            wrong_password.style.display = 'block'
            setTimeout(()=>{wrong_password.style.display = 'none'}, 5000)
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