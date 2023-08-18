let button = document.getElementById("loginbutton")
let password = document.getElementById("password")
let email = document.getElementById("email")
let aviso = document.getElementById("faltan_datos")
let contrasena_incorrecta = document.getElementById("contrasena_incorrecta")
console.log(button)

contrasena_incorrecta.style.display = 'none'
aviso.style.display = 'none'

function toInicio (event){
    event.preventDefault()
    if (email.value != '' && password.value != ''){
        validarUser()
        //location.href ='index.html'
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
            location.href = 'index.html' // Se establece que hay una sesión abierta y redirexiona al índice
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

/*function validarUser(){
    if (email.value == "admin"){
        if (password.value == "admin"){
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('username', email.value);
            console.log('Datos guardados')
            checkearSesion();
            location.href = 'index.html'
        }
        else{
            console.log('Error de contrasena')
        }
    }
    else{
        console.log('Error de usuario')
    }
}


function checkearSesion(){
    if (localStorage.getItem('userLoggedIn') === 'true'){
        const checkUsername = localStorage.getItem('username');
        console.log(`Usuario ${checkUsername} ha iniciado sesión.`);
        alert(`Bienvenido ${checkUsername}`)
    }
}
*/