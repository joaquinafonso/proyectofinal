let container = document.getElementById('product-info-container')
let productId = localStorage.getItem('currentProduct')

fetch(PRODUCT_INFO_URL+productId+'.json')
.then(response => response.json())
.then(data => {
        productItem = data;
        console.log(productItem)

        let div = document.createElement('div')
        div.classList = ('col-md-3')
        div.innerHTML = `<div class='productBody'>
            <div>
                <h3 class='productItemInfo'>${productItem.name}</h3><hr>
                <h3 class='productItemTitle'>Precio</h3>
                <p class='productItemInfo'>${productItem.currency} ${productItem.cost}</p>
                <h3 class='productItemTitle'>Descripción</h3>
                <p class='productItemInfo'>${productItem.description}</p>
                <h3 class='productItemTitle'>Categoría</h3>
                <p class='productItemInfo'>${productItem.category}</p>
                <h3 class='productItemTitle'>Cantidad de vendidos</h3>
                <p class='productItemInfo'>${productItem.soldCount}</p>
                <h3>Imagenes ilustrativas</h3>
            </div>
            <div class='productItemImages'>
                <img src='${productItem.images[0]}' width='40%'></img>
                <img src='${productItem.images[1]}' width='40%'></img>
                <img src='${productItem.images[2]}' width='40%'></img>
                <img src='${productItem.images[3]}' width='40%'></img>
            </div>
        </div>`
        
        container.appendChild(div)
    })
.catch(error => console.error('Error:', error));

console.log(productId)