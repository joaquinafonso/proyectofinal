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

    // for(const element of articles){
    //     addProduct(element)
    //     let cost = element.unitCost
    //     if(element.currency == 'UYU'){
    //         cost /= currency_conversion
    //     }
    //     totalCost += cost;
    // }
    const cartProducts = JSON.parse(localStorage.getItem('cart'))
    if(cartProducts.length == 0){
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
        for(const element of cartProducts){
            addProduct(element)
            let cost = element.unitCost
            if(element.currency == 'UYU'){
                cost /= currency_conversion
            }
            totalCost += cost;
        }
    }
    unitCost.innerHTML= Math.round(totalCost)
    updateShippingCost()
}




shippingType.addEventListener('input', updateShippingCost)
function updateShippingCost(){
    const shippingOptions = shippingType.getElementsByTagName('input')
    const selectedOption = Array.from(shippingOptions).filter((el => el.checked))

    let shippingValue = 0;
    switch(selectedOption[0].defaultValue){
        case 'standard':
            shippingValue = 0.05;
            break;
        case 'express':
            shippingValue = 0.07;
            break;
        case 'premium':
            shippingValue = 0.15;
            break;
    }
    shippingValue *= unitCost.innerHTML
    shippingCost.innerHTML = Math.round(shippingValue)
    totalCost.innerHTML = Number(shippingCost.innerHTML) + Number(unitCost.innerHTML)
}


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