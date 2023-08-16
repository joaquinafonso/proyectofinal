let button = document.getElementById("loginbutton")
let password = document.getElementById("password")
let email = document.getElementById("email")
let aviso = document.getElementById("faltan_datos")
console.log(button)

aviso.style.display = 'none'
function toInicio (event){
    event.preventDefault()
    if (email.value != '' && password.value != ''){
        location.href ='index.html'
    }else{
        aviso.style.display = 'block'
        setTimeout(()=>{aviso.style.display = 'none'}, 5000)
    }
}

button.addEventListener("click", toInicio)
