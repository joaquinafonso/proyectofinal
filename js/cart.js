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

Promise.all([
    fetch(API_URL).then(res => res.json()), 
    fetch(EXCHANGE_URL).then(res => res.json())])
.then(data => loadCart(...data))

function loadCart (data, exchange){
    const currency_conversion = exchange.data.UYU.value
    const articles = data.articles
    let totalCost = 0;

    for(const element of articles){
        addProduct(element)
        let cost = element.unitCost
        if(element.currency == 'UYU'){
            cost /= currency_conversion
        }
        console.log(cost)
        totalCost += cost;
    }
    for(const element of JSON.parse(localStorage.getItem('cart'))){
        addProduct(element)
        let cost = element.unitCost
        if(element.currency == 'UYU'){
            cost /= currency_conversion
        }
        console.log(cost)
        totalCost += cost;
    }
    unitCost.innerHTML= Math.round(totalCost) + 'USD'
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

