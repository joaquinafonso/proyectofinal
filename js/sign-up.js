document.addEventListener("DOMContentLoaded", ()=>{

let button = document.getElementById("signUpButton")
let password = document.getElementById("password")
let confirm_password = document.getElementById("confirm-password")
let email = document.getElementById("email")
let invalid_user = document.getElementById("usuario-registrado")
let missing_values = document.getElementById("faltan_datos")
let different_passwords = document.getElementById("contrasena_incorrecta")


button.addEventListener("click", registerUser)
    
missing_values.style.display = 'none'
invalid_user.style.display = 'none'
different_passwords.style.display = 'none'

/*
        *** ESTRUCTURA DEL REGISTRO DE USUARIOS ***

localStorage = {
    register: {
        isConected: true,
        actualUser: 'email-actual',
        users:[
            {
                email: 'email_1',
                password: 'contraseña_1',
                name: 'nombre_1',
                second_name: 'segundo_nombre_1',
                lastname: 'apellido_1',
                second_lastname: 'segundo_apellido_1',
                phone: 'telefono_1',
                photo: 'imagen_1'
            },
            ...
        ]
    }
}
*/



function registerUser (event){
    event.preventDefault()
    if (email.value != '' && password.value != ''){
        if(register.users.some(user => user.email == email.value)){ // Si el correo ya estaba registrado muestra una alerta
            invalid_user.style.display = 'block'
            setTimeout(()=>{invalid_user.style.display = 'none'}, 5000)
        }else if(password.value != confirm_password.value){ // Si las contraseñas ingresadas no son iguales muestra un alerta
            different_passwords.style.display = 'block'
            setTimeout(()=>{different_passwords.style.display = 'none'}, 5000)
        }else if (password.value == confirm_password.value){ // Si está todo bien sigue en validarUsario()
            validateUser()
        }
    }else{ // Si faltan datos muestra una alerta
        missing_values.style.display = 'block'
        setTimeout(()=>{missing_values.style.display = 'none'}, 5000)
    }
}


function validateUser(){ // Se guardan los valores establecidos, establece que hay una sesión abierta, guarda cual es la sesión abierta y redirecciona al índice 
    let newUser = {
        email: email.value,
        password: password.value,
        name: '',
        second_name: '',
        lastname: '',
        second_lastname: '',
        phone: '',
        photo: ''
    }
    register.isConected = true
    register.actualUser = newUser
    register.users.push(newUser)
    localStorage.setItem('register', JSON.stringify(register))
    location.href = 'index.html'      
}

})
