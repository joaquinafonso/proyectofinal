const body = document.getElementById('body')
const container = document.getElementById('productsGrid');
let i = 0

API_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json'


fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
    .then(response => response.json())
    .then(data => {const productList = data.products;
        for (let i=0; i<productList.length; i++) {
            const paragraph = document.createElement("p");
            paragraph.innerText = productList[i].name;
            //document.body.appendChild(paragraph);
            let div = document.createElement('div')
            div.classList = ('col-md-3')

            div.innerHTML = `<div class='card' style='width: auto;'><img src='${productList[i].image}' class='card-img-top' alt='...'><div class='card-body'><h5 class='card-title'>${productList[i].name}</h5><p class='card-text'>${productList[i].description}</p><span class='btn btn-primary btn-price'>${productList[i].currency} ${productList[i].cost}</span></div></div>`

            container.appendChild(div)
            
            
        }
    })
    .catch(error => console.error('Error:', error));

   

