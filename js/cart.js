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

let paymentFeedback = document.getElementById('paymentFeedback')
const buyBtn = document.getElementById('buyBtn')
let streetAddress = document.getElementById('streetAddress')
let addressNumber = document.getElementById('addressNumber')
let addressDetail = document.getElementById('addressDetail')
const premium = document.getElementById('premium')
const express = document.getElementById('express')
const standard = document.getElementById('standard')

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

function validateDeliveryType() {
    let deliveryRadios = document.getElementsByName("deliveryType");
    let isValid = false;

    for (let i = 0; i < deliveryRadios.length; i++) {
        if (deliveryRadios[i].checked) {
            isValid = true;
            break;
        }
    }

    let validationDelivery = document.getElementById("validationDelivery");

    if (!isValid) {
        validationDelivery.style.display = 'block'
    } 
    else{
        validationDelivery.style.display = 'none'
    }
}

// Funcion para validar método de pago y campos requeridos
function validatePaymentMethod() {
    let paymentRadios = document.getElementsByName("paymentMethod");
    let isPaymentValid = false;

    for (let i = 0; i < paymentRadios.length; i++) {
        if (paymentRadios[i].checked) {
            isPaymentValid = true;
            break;
        }
    }

    if (!isPaymentValid) {
        paymentFeedback.style.display = 'block'
    } 
    else{
        paymentFeedback.style.display = 'none'
    }

    // Valida los campos requeridos para cada metodo de pago
    if (paymentMethodCard.checked) {
        if (!ccn.checkValidity()) {
            paymentFeedback.te
            paymentFeedback.style.display = 'block'
        } else {
            ccn.classList.remove('is-invalid');
        }
    } else {
        streetAddress.classList.remove('is-invalid');
    }
}

buyBtn.addEventListener('click', function(){
    // Valida la calle
    if (!streetAddress.checkValidity()) {
        event.preventDefault();
        streetAddress.classList.add('is-invalid');
    } else {
        streetAddress.classList.remove('is-invalid');
    }
    // Valida el numero
    if (!addressNumber.checkValidity()) {
        event.preventDefault();
        addressNumber.classList.add('is-invalid');
    } else {
        addressNumber.classList.remove('is-invalid');
    }
    // Valida la esquina
    if (!addressDetail.checkValidity()) {
        event.preventDefault();
        addressDetail.classList.add('is-invalid');
    } else {
        addressDetail.classList.remove('is-invalid');
    }
    // Valida si hay tipo de envio seleccionado
    
    validateDeliveryType()

    // Valida metodo de pago
    validatePaymentMethod()
    //cosas que suceden al darle click a comprar
    //validacion y eso en desarrollo
})

