const inputAvatar = document.getElementById('input-avatar')
const displyaAvatar = document.getElementById('display-avatar')
const form = document.getElementById('user-form')

const name = document.getElementById('name')
const secondName = document.getElementById('second-name')
const lastname = document.getElementById('lastname')
const secondLastname = document.getElementById('second-lastname')
const email = document.getElementById('email')
const phone = document.getElementById('phone')

inputAvatar.addEventListener('change', updateImageDisplay)

function updateImageDisplay (){
    if(inputAvatar.value != ""){
        displyaAvatar.src = URL.createObjectURL(inputAvatar.files[0])
    }
}

name.value = register.actualUser.name
secondName.value = register.actualUser.second_name
lastname.value = register.actualUser.lastname
secondLastname.value = register.actualUser.second_lastname
email.value = register.actualUser.email
phone.value = register.actualUser.phone

form.addEventListener('submit', submitValues)
function submitValues (evt){
    evt.preventDefault()
}