const inputAvatar = document.getElementById('input-avatar')
const displyaAvatar = document.getElementById('display-avatar')

inputAvatar.addEventListener('change', updateImageDisplay)

function updateImageDisplay (){
    if(inputAvatar.value != ""){
        displyaAvatar.src = URL.createObjectURL(inputAvatar.files[0])
    }
}