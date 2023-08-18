let button = document.getElementById("loginbutton")
let password = document.getElementById("password")
let email = document.getElementById("email")
let aviso = document.getElementById("faltan_datos")
console.log(button)

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
    }
}