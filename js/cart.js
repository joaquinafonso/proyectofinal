const API_URL = CART_INFO_URL + '25801.json'
const cart = document.getElementById('cart')
const paymentMethodCard = document.getElementById('paymentMethodCard')
const paymentMethodTransfer = document.getElementById('paymentMethodTransfer')
const transferAccNum = document.getElementById('transferAccNum')
const applyPaymentMethod = document.getElementById('applyPaymentMethod')
let paymentMethodStatus = document.getElementById('paymentMethod')
let selectPaymentMethod = document.getElementById('selectPaymentMethod')
const ccn = document.getElementById('ccn')
const ccv = document.getElementById('ccv')
const expirationDate = document.getElementById('expirationDate')


fetch(API_URL).then(res => res.json()).then(data => loadCart(data))

function loadCart (data){
    const articles = data.articles

    for(const element of articles){
        addProduct(element)
    }
    for(const element of JSON.parse(localStorage.getItem('cart'))){
        addProduct(element)
    }

}

function addProduct (element){
    const article = document.createElement('div')
    article.classList = 'article'
    article.innerHTML = `<img src='${element.image}'/> 
    <p onclick="localStorage.setItem('currentProduct', '${element.id}'); window.location = 'product-info.html'">${element.name}</p>
    <p>${element.currency} ${element.unitCost}</p>
    <input type='number' onchange="updateCount(this.value, ${element.unitCost}, ${element.id})" value=${element.count} min=1></input>
    <p>${element.currency} <span id="${element.id}">${element.unitCost * element.count}<span></p>`

    cart.appendChild(article)
}

function updateCount(count, cost, id){
    document.getElementById(id).innerHTML = count * cost
}

applyPaymentMethod.addEventListener('click', function(){
    selectPaymentMethod.innerHTML = 'Modificar'
    if(paymentMethodCard.checked){
        localStorage.setItem('paymentMethod','card')
        paymentMethodStatus.innerHTML = 'Tarjeta de crédito'
    }
    if(paymentMethodTransfer.checked){
        localStorage.setItem('paymentMethod','transfer')
        paymentMethodStatus.innerHTML = 'Transferencia bancaria'
    }
    // localStorage.setItem('paymentMethod',)
})

paymentMethodCard.addEventListener('click', function(){
    transferAccNum.disabled = true
    ccn.disabled = false
    ccv.disabled = false
    expirationDate.disabled = false
})

paymentMethodTransfer.addEventListener('click', function(){
    transferAccNum.disabled = false
    ccn.disabled = true
    ccv.disabled = true
    expirationDate.disabled = true
})

    // Validación del formulario
    $(document).ready(function() {
        $('#pedido-form').submit(function(e) {
            if (!$('#calle').val() || !$('#numero').val() || !$('#esquina').val()) {
                alert("Los campos de dirección no pueden estar vacíos.");
                e.preventDefault();
            }
            if ($('#forma-envio').val() === "") {
                alert("Debes seleccionar una forma de envío.");
                e.preventDefault();
            }
            if ($('#cantidad-articulo').val() <= 0) {
                alert("La cantidad del artículo debe ser mayor a 0.");
                e.preventDefault();
            }
            if ($('#forma-pago').val() === "") {
                alert("Debes seleccionar una forma de pago.");
                e.preventDefault();
            }
            if ($('#forma-pago').val() === "tarjeta-credito" && !$('#detalle-pago').val()) {
                alert("El detalle de pago no puede estar vacío.");
                e.preventDefault();
            }
        });
    });
