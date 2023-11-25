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
    if(register.users.some(user => user.email == email.value)){ // Si está registrado
        for(let user of register.users){
            if(user.email == email.value){ // Si se encuentra un usuario registrado con ese mail
                if(user.password == password.value){ // Si la contraseña coincide
                    register.isConected = true
                    register.actualUser = user
                    localStorage.setItem('register', JSON.stringify(register))

                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    var raw = JSON.stringify({name: register.actualUser.name});
                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch("http://localhost:3000/login", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result)
                        localStorage.setItem('access-token', result.token)
                        location.href = 'index.html'
                    })
                    .catch(error => console.log('error', error));
                }else{
                    wrong_password.style.display = 'block'
                    setTimeout(()=>{wrong_password.style.display = 'none'}, 5000)
                }
                break;
            }
        }
    }else{ // En caso de que no se haya registrado el email antes
        let nuevaCuenta = confirm("El email ingresado no ha sido registrado. Deseas crear una cuenta?") // Pregunta si quiere crear cuenta
        if(nuevaCuenta){ // Si quiere crear una cuenta lo redirige a la página correspondiente
            location.href = 'sign-up.html'
        }else{ // Si no quiere crear una cuenta reseetea los valores
            email.value = null;
            password.value = null;
        }
    }
}