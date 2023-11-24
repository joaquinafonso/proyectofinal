const container = document.getElementById('product-info-container')
const relatedSection = document.getElementById('relatedSection')

let productId = localStorage.getItem('currentProduct')
const API_URL = PRODUCT_INFO_URL + productId
const COMMENTS_URL = PRODUCT_INFO_COMMENTS_URL + productId

const missing_values = document.getElementById("faltan_datos")
const successfullyAdded = document.getElementById('successfully_added')
const alreadyExist = document.getElementById('already_exists')
missing_values.style.display = 'none'
successfullyAdded.style.display = 'none'
alreadyExist.style.display = 'none'


fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        fetch(COMMENTS_URL)
            .then(response => response.json())
            .then((comments) => ready(data, comments))
    })
    .catch(error => console.error('Error:', error))

function ready(productItem, comments) {
    let data = {
        name: productItem.name, 
        id: productItem.id, 
        count: 1, 
        unitCost: productItem.cost, 
        currency: productItem.currency,
        image: productItem.images[0]
    }
    const description = document.createElement('section')
    description.innerHTML = `
        <div id='productBody'>
            <button class='btn btn-success' style="position: absolute; right: 10vw; margin-top: 1rem;" onclick='adToCart(${JSON.stringify(data)})'> Comprar </button>
            <h1 class='productItemInfo'>${productItem.name}</h1>
            <hr>
            <button class='btn btn-outline-secondary' style="position: absolute; right: 10vw; margin-top: 1rem;" onClick="window.location = 'products.html'" >Volver al listado</button>
            <strong class='productItemTitle'>Precio</strong>
            <p class='productItemInfo'>${productItem.currency} ${productItem.cost}</p>
            <strong class='productItemTitle'>Descripción</strong>
            <p class='productItemInfo'>${productItem.description}</p>
            <strong class='productItemTitle'>Categoría</strong>
            <p class='productItemInfo'>${productItem.category}</p>
            <strong class='productItemTitle'>Cantidad de vendidos</strong>
            <p class='productItemInfo'>${productItem.soldCount}</p>
            <strong>Imagenes ilustrativas</strong>
        </div>`
    container.appendChild(description)

    const imagesSection = document.getElementById("carousel")
    for(let url of productItem.images){
        imagesSection.innerHTML += `
        <div class="carousel-item image">
            <img src=${url} class="d-block w-50">
        </div>`
    }
    imagesSection.lastChild.classList = 'carousel-item active image'
    container.appendChild(imagesSection.parentNode)
    
    const commentsSection = document.createElement('section')
    commentsSection.id = 'commentsSection'
    const commentTitle = document.createElement('h2')
    commentTitle.innerHTML = 'Comentarios'
    commentTitle.id = 'commentTitle'
    commentsSection.appendChild(commentTitle)
    for(let element of comments){
        addComment(element, commentsSection)
    }
    container.appendChild(commentsSection)

    const commentForm = document.getElementById('commentForm')
    commentForm.addEventListener('submit', addNewComment)
    container.appendChild(commentForm)

    function addNewComment(evt){
        evt.preventDefault()
        let date = new Date().toLocaleDateString().replace(/(\d+)\/(\d+)\/(\d+)/g, '$3-$2-$1')
        if(evt.target[0].value != '' && evt.target[1].value != 0){
            addComment({
                description: evt.target[0].value,
                score: evt.target[1].value,
                user: JSON.parse(localStorage.getItem('register')).actualUser,
                dateTime: date + ' ' + new Date().toLocaleTimeString()
            }, commentsSection)
            evt.target[0].value = ''
            evt.target[1].value = 0
        }else{ // Si faltan datos muestra una alerta
            missing_values.style.display = 'block'
            setTimeout(()=>{missing_values.style.display = 'none'}, 5000)
        }
    }
    
    for (element of productItem.relatedProducts){
        showRelated(element)
    }
}

function showRelated(relatedProd) {
    let relatedElement = document.createElement('div')
    relatedElement.classList = 'col-md-3'
    relatedElement.addEventListener('click', ()=>{
        localStorage.setItem('currentProduct', relatedProd.id)
        window.location = "product-info.html"
    })
    relatedElement.innerHTML = `
        <div class='card'>
            <img class="img-thumbnail" src=${relatedProd.image}></img>
            <h3 class="relatedName">${relatedProd.name}</h3>
        <div>
    `
    relatedSection.appendChild(relatedElement)
}
    
    
function addComment(element, commentsSection){
    let comment = document.createElement('div')
    comment.classList = 'comment'

    let user = document.createElement('strong')
    user.classList = 'commentName'
    user.innerHTML = element.user
    comment.appendChild(user)

    let date = document.createElement('em')
    date.classList = 'commentDate'
    date.innerHTML = element.dateTime
    comment.appendChild(date)

    
    let countStar = element.score
    countStar.classList = 'commentScore'
    for(let i = 0; i < 5; i++){
        let star = document.createElement('span')
        if(countStar > 0){
            star.classList = 'fa fa-star checked'
            countStar --
        }else{
            star.classList = 'fa fa-star'
        }
        comment.appendChild(star)
    }
    commentsSection.appendChild(comment)
    commentsSection.classList = 'productComments'

    comment.innerHTML += "<br>"

    let commentInfo = document.createElement('q')
    commentInfo.innerHTML = element.description
    comment.appendChild(commentInfo)
}

function adToCart (product){
    let cart = JSON.parse(localStorage.getItem('cart'))
    if(!cart.some((element) => element.id == product.id)){
        cart.push(product)
        localStorage.setItem('cart', JSON.stringify(cart))
        successfullyAdded.style.display = 'block'
        setTimeout(()=>{successfullyAdded.style.display = 'none'}, 5000)
    }else{
        alreadyExist.style.display = 'block'
        setTimeout(()=>{alreadyExist.style.display = 'none'}, 5000)
    }
}