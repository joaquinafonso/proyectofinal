const API_URL = CART_INFO_URL + '25801.json'
const cart = document.getElementById('cart')

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
    <p>${element.name}</p>
    <p>${element.currency} ${element.unitCost}</p>
    <input type='number' onchange="updateCount(this.value, ${element.unitCost}, ${element.id})" value=${element.count} min=1></input>
    <p>${element.currency} <span id="${element.id}">${element.unitCost * element.count}<span></p>`

    cart.appendChild(article)
}

function updateCount(count, cost, id){
    document.getElementById(id).innerHTML = count * cost
}