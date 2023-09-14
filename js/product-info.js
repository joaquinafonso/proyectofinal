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
        commentsSection.classList = 'productComments';
        
        for(let element of comments){
            let comment = document.createElement('div')
            let commentUser = element.user
            let commentDateTime = element.dateTime
            let commentBody = document.createElement('q')
            commentBody.innerHTML = `${element.description}`
            let commentInfo = document.createElement('p')
            commentInfo.innerHTML = `${commentUser}&nbsp&nbsp${commentDateTime}`
            comment.appendChild(commentInfo)
            comment.appendChild(commentBody)

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
        }
        container.appendChild(commentsSection)

}

console.log(productId)