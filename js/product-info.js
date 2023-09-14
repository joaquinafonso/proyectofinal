let container = document.getElementById('product-info-container')
let productId = localStorage.getItem('currentProduct')
const API_URL = PRODUCT_INFO_URL + productId + ".json"
const COMMENTS_URL = PRODUCT_INFO_COMMENTS_URL + productId + ".json"

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        fetch(COMMENTS_URL)
            .then(response => response.json())
            .then((comments) => ready(data, comments))
    })
    .catch(error => console.error('Error:', error));

function ready(productItem, comments) {
    const description = document.createElement('section')
    description.classList = ('col-md-3')
    description.innerHTML = `
        <div class='productBody'>
            <h3 class='productItemInfo'>${productItem.name}</h3>
            <hr>
            <h3 class='productItemTitle'>Precio</h3>
            <p class='productItemInfo'>${productItem.currency} ${productItem.cost}</p>
            <h3 class='productItemTitle'>Descripción</h3>
            <p class='productItemInfo'>${productItem.description}</p>
            <h3 class='productItemTitle'>Categoría</h3>
            <p class='productItemInfo'>${productItem.category}</p>
            <h3 class='productItemTitle'>Cantidad de vendidos</h3>
            <p class='productItemInfo'>${productItem.soldCount}</p>
            <h3>Imagenes ilustrativas</h3>
        </div>`
    container.appendChild(description)

    const imagesSection = document.createElement('section')
    imagesSection.classList = 'productItemImages'
    for(let url of productItem.images){
        let img = document.createElement('img')
        img.src = url
        img.width = "200"
        imagesSection.appendChild(img)
    }
    container.appendChild(imagesSection)
    
    const commentsSection = document.createElement('section')
    commentsSection.classList = 'comments'
    for(let element of comments){
        addComment(element, commentsSection)
    }
    container.appendChild(commentsSection)

    const commentForm = document.createElement('form')
    commentForm.classList = 'addComment'
    commentForm.innerHTML = `
    <h3>Comentar</h3>
    <p>Tu opinión:</p>
    <textarea></textarea>
    <p>Tu puntuación:</p>
    <select>
        <option value="0"></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    <input type="submit">
    `
    commentForm.addEventListener('submit', addNewComment)
    container.appendChild(commentForm)
    function addNewComment(evt){
        evt.preventDefault()
        let comment = [evt.target[0]]
        console.log(evt.target[0].value, evt.target[1].value, JSON.parse(localStorage.getItem('register')).actualUser, new Date())
        addComment({
            description: evt.target[0].value,
            score: evt.target[1].value,
            user: JSON.parse(localStorage.getItem('register')).actualUser,
            dateTime: new Date()
        }, commentsSection)
    }
}
    
function addComment(element, commentsSection){
    let comment = document.createElement('div')

    let user = document.createElement('strong')
    user.innerHTML = element.user
    comment.appendChild(user)

    let date = document.createElement('strong')
    date.innerHTML = element.dateTime
    comment.appendChild(date)

    
    let countStar = element.score
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
    
    comment.innerHTML += "<br>"

    let commentInfo = document.createElement('q')
    commentInfo.innerHTML = element.description
    comment.appendChild(commentInfo)
}