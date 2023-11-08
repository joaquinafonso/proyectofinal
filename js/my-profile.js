const inputAvatar = document.getElementById('input-avatar')
const displyaAvatar = document.getElementById('display-avatar')
const form = document.getElementById('user-form')
const invalidEmail = document.getElementById('invalid_email')

const name = document.getElementById('name')
const secondName = document.getElementById('second-name')
const lastname = document.getElementById('lastname')
const secondLastname = document.getElementById('second-lastname')
const email = document.getElementById('email')
const phone = document.getElementById('phone')

invalidEmail.style.display = 'none'

inputAvatar.addEventListener('change', updateImageDisplay)
function updateImageDisplay (){
    if(inputAvatar.value != ""){
        displyaAvatar.src = URL.createObjectURL(inputAvatar.files[0])
    }
}

displyaAvatar.src = register.actualUser.photo
name.value = register.actualUser.name
secondName.value = register.actualUser.second_name
lastname.value = register.actualUser.lastname
secondLastname.value = register.actualUser.second_lastname
email.value = register.actualUser.email
phone.value = register.actualUser.phone

form.addEventListener('submit', submitValues)
function submitValues (event){
    if(register.users.filter(user => user.email == email.value).length >= 1 && email.value != register.actualUser.email){
        event.preventDefault()
        event.stopPropagation()
        email.setCustomValidity("Email en uso")
        invalidEmail.style.display = 'block'
        setTimeout(()=>{invalidEmail.style.display = 'none'}, 5000)
    }else{
        email.setCustomValidity("")
    }
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }else{
        let index = register.users.map(user => user.email).indexOf(register.actualUser.email)
        register.actualUser.name = name.value
        register.actualUser.second_name = secondName.value
        register.actualUser.lastname = lastname.value
        register.actualUser.second_lastname = secondLastname.value
        register.actualUser.email = email.value
        register.actualUser.phone = phone.value
        register.actualUser.photo = inputAvatar.value != "" ? URL.createObjectURL(inputAvatar.files[0]) : register.actualUser.photo
        register.users[index] = register.actualUser
        localStorage.setItem('register', JSON.stringify(register))
    }
    form.classList.add('was-validated')    
}