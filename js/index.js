document.addEventListener("DOMContentLoaded", function(){

    const endSessionBtn = document.getElementById('endSession');
    endSessionBtn.addEventListener('click', function () {
        register.isConected = false
        register.actualUser = '-'
        localStorage.setItem('register', JSON.stringify(register))
        alert('Has cerrado sesión')
        location.href = 'login.html'
    })

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


const modoNocturnoBtn = document.getElementById("modoNocturnoBtn");
const body = document.body;

function changeMode() {
  if (body.classList.contains("night-mode")) {
    body.classList.remove("night-mode");
    localStorage.setItem("modo", "diurno");
  } else {
    body.classList.add("night-mode");
    localStorage.setItem("modo", "nocturno");
  }
}

nightModeBtn.addEventListener("click", changeMode);

// Verifica el estado del modo al cargar la página
window.addEventListener("load", () => {
  const actualMode = localStorage.getItem("modo");
  if (actualMode === "nocturno") {
    body.classList.add("night-mode");
  }
});