let categoryProduct = localStorage.getItem('catID');
const container = document.getElementById('productsGrid');
const API_URL = `https://japceibal.github.io/emercado-api/cats_products/${categoryProduct}.json`;

let productList = []; 

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        productList = data.products;
        const savedFilters = JSON.parse(localStorage.getItem('productFilters')) || {};

        applyFilters(savedFilters);
    })
    .catch(error => console.error('Error:', error));

function displayProducts(products) {
    container.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
    }
}

function applyFilters(minPrice, maxPrice, sortBy) {
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
}

const filterForm = document.getElementById('filterForm'); 

filterForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const minPrice = parseFloat(document.getElementById('minPrice').value);
    const maxPrice = parseFloat(document.getElementById('maxPrice').value);
    const sortBy = document.getElementById('sortBy').value;

    applyFilters(minPrice, maxPrice, sortBy);
    saveFilters(minPrice, maxPrice, sortBy);
});
