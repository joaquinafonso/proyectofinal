document.addEventListener("DOMContentLoaded", function(){
    
    if (localStorage.getItem('userLoggedIn') === 'true'){
        const user = localStorage.getItem('username')
    }
    else{
        alert('Detectamos que no has iniciado sesión en este dispositivo. \n Da clic en aceptar para iniciar sesión. ')
        window.location = "login.html"
    }

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});