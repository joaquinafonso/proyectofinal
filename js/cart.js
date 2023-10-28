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
const exchangeValue = EXCHANGE_URL
const unitCost = document.getElementById('unit-cost')
const shippingCost = document.getElementById('shipping-cost')
const totalCost = document.getElementById('total-cost')


fetch(API_URL).then(res => res.json()).then(data => loadCart(data))

function loadCart (data){
    const currency_conversion = 40
    const articles = data.articles

    let totalCost = 0;

    for(const element of articles){
        addProduct(element)
        let cost = element.unitCost
        if(element.currency == 'UYU'){
            cost /= currency_conversion
        }
        totalCost += cost;
    }
    for(const element of JSON.parse(localStorage.getItem('cart'))){
        addProduct(element)
        let cost = element.unitCost
        if(element.currency == 'UYU'){
            cost /= currency_conversion
        }
        totalCost += cost;
    }
    unitCost.innerHTML= Math.round(totalCost)
    updateShippingCost()
}


document.getElementById('standard').addEventListener('click',function(){
    resultStandard = (unitCost.innerHTML*5)/100
    shippingCost.innerHTML = Math.round(resultStandard)
    totalCost.innerHTML = Number(unitCost.innerHTML) +  Number(Math.round(resultStandard))
}) 

document.getElementById('express').addEventListener('click',function(){
    resultExpress = (unitCost.innerHTML*7)/100
    shippingCost.innerHTML = Math.round(resultExpress)
    totalCost.innerHTML = Number(unitCost.innerHTML) +  Number(Math.round(resultExpress))
})
        
document.getElementById('premium').addEventListener('click',function(){
    resultPremium = (unitCost.innerHTML*15)/100
    shippingCost.innerHTML = Math.round(resultPremium)
    totalCost.innerHTML = Number(unitCost.innerHTML) + Number(Math.round(resultPremium))

})
   










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

// const total = document.getElementById('total');

//   // Función para calcular y actualizar los valores
// function calcTotal() {
//     // Obtiene el costo unitario del producto (puedes obtenerlo de tu carrito)
// const unitCostElement = 100.00; 

//     // Obtiene el costo de envío según el tipo de envío seleccionado
// const shippingType = 'normal'; 
// let shippingCost = 0.00;

// if (shippingType === 'normal') {
//     shippingCost = unitCostElement * 0.05; 
// } else if (shippingType === 'express') {
//     shippingCost = unitCostElement * 0.07; 
// } else if (shippingType === 'premium') {
//     shippingCost = unitCostElement * 0.15; 
// }

//     // Calcula el subtotal general
// const subtotalGeneral = unitCostElement + shippingCost;

//     // Actualiza los elementos en la página
// unitCost.textContent = `$${unitCostElement.toFixed(2)}`;
// shippingCostElement.textContent = `$${shippingCost.toFixed(2)}`;
// total.textContent = `$${subtotalGeneral.toFixed(2)}`;
// }

// calcTotal();