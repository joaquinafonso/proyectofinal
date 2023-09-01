let categoryProduct = localStorage.getItem('catID');
const container = document.getElementById('productsGrid');
const API_URL = `https://japceibal.github.io/emercado-api/cats_products/${categoryProduct}.json`;

let productList = []; 

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        productList = data.products;
        for (let i=0; i<productList.length; i++) {
            const paragraph = document.createElement("p");
            paragraph.innerText = productList[i].name;
            let div = document.createElement('div')
            div.classList = ('col-md-3')

            div.innerHTML = `<div class='card' style='width: auto;'><img src='${productList[i].image}' class='card-img-top' alt='...'><div class='card-body'><h5 class='card-title'>${productList[i].name}</h5><p class='card-text'>${productList[i].description}</p><span class='btn btn-primary btn-price'>${productList[i].currency} ${productList[i].cost}</span></div></div>`

            container.appendChild(div)
        }    
    })    
    .catch(error => console.error('Error:', error));

    function displayProducts(products) {
    container.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
    }
}

{/* function applyFilters(minPrice, maxPrice, sortBy) {
    let filteredProducts = [...productList];

    if (minPrice !== undefined && maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product =>
            product.cost >= minPrice && product.cost <= maxPrice
        );
    }

    if (sortBy === 'priceAsc') {
        filteredProducts.sort((a, b) => a.cost - b.cost);
    } else if (sortBy === 'priceDesc') {
        filteredProducts.sort((a, b) => b.cost - a.cost);
    } else if (sortBy === 'relevanceDesc') {
        filteredProducts.sort((a, b) => b.sold - a.sold);
    }

    displayProducts(filteredProducts);
}

function saveFilters(minPrice, maxPrice, sortBy) {
    const filters = { minPrice, maxPrice, sortBy };
    localStorage.setItem('productFilters', JSON.stringify(filters));
}  */}



const filterForm = document.getElementById('filterForm');

filterForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const minPrice = parseFloat(document.getElementById('minPrice').value);
    const maxPrice = parseFloat(document.getElementById('maxPrice').value);
    const sortBy = document.getElementById('sortBy').value;

    applyFilters(minPrice, maxPrice, sortBy);
    saveFilters(minPrice, maxPrice, sortBy);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showCategoriesList();
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showCategoriesList();
});
