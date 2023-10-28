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
const unitCost = document.getElementById('unit-cost')
const shippingCost = document.getElementById('shipping-cost')
const totalCost = document.getElementById('total-cost')


fetch(API_URL).then(res => res.json()).then(element => {
    let data = JSON.parse(localStorage.getItem('cart'))
    data.unshift(...element.articles)
    console.log(data)
    loadCart(data)})

function loadCart (data){
    const currency_conversion = 40
    let totalCost = 0;

    if(data.length == 0){
        cart.innerHTML="<h3 class='danger'>No hay artículos en su carrito</h3>"
    }else{
        cart.innerHTML=`<div class="article article-title">
        <span></span>
        <p>Nombre</p>
        <p>Costo</p>
        <p>Cantidad</p>
        <p>Subtotal</p>
      </div>
      <hr />`
        for(const element of data){
            addProduct(element)
            let cost = element.unitCost
            if(element.currency == 'UYU'){
                cost /= currency_conversion
            }
            console.log(element.count, cost, cost * element.count)
            totalCost += cost * Number(element.count);
        }
    }
    unitCost.innerHTML= Math.round(totalCost)
    expressShipping()
}


document.getElementById('standard').addEventListener('click', function(){
    resultStandard = (unitCost.innerHTML*5)/100
    shippingCost.innerHTML = Math.round(resultStandard)
    totalCost.innerHTML = Number(unitCost.innerHTML) +  Number(Math.round(resultStandard))
})

document.getElementById('express').addEventListener('click', expressShipping)
function expressShipping(){
    resultExpress = (unitCost.innerHTML*7)/100
    shippingCost.innerHTML = Math.round(resultExpress)
    totalCost.innerHTML = Number(unitCost.innerHTML) +  Number(Math.round(resultExpress))

}
        
document.getElementById('premium').addEventListener('click',function(){
    resultPremium = (unitCost.innerHTML*15)/100
    shippingCost.innerHTML = Math.round(resultPremium)
    totalCost.innerHTML = Number(unitCost.innerHTML) + Number(Math.round(resultPremium))

})
   


function addProduct (element){
    const article = document.createElement('div')
    let unitCost = element.unitCost
    if(element.currency == 'UYU'){
        unitCost = Math.round(unitCost / 40);
    }
    article.classList = 'article'
    article.innerHTML = `<img src='${element.image}'/> 
    <p onclick="localStorage.setItem('currentProduct', '${element.id}'); window.location = 'product-info.html'">${element.name}</p>
    <p>USD ${unitCost}</p>
    <input type='number' onchange="updateCount(this.value, ${element.unitCost}, ${element.id})" value=${element.count} min=1></input>
    <p>USD <span id="${element.id}">${unitCost * element.count}<span></p>
    <button onclick=removeProduct(${element.id}) class="btn border-danger"><i class="fa-solid fa-trash-can" style="color: #ff0000;"></i></button>`

    cart.appendChild(article)
}

function removeProduct(id){
    const element = JSON.parse(localStorage.getItem('cart'))
        .filter(element => element.id != id)
    localStorage.setItem('cart', JSON.stringify(element))
    loadCart(element)
}

function updateCount(count, cost, id){
    document.getElementById(id).innerHTML = count * cost
    let elements = JSON.parse(localStorage.getItem('cart'))
    elements.forEach(element => {
        if(element.id == id){
            element.count = count
        }
    });
    console.log(elements)
    loadCart(elements)
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
