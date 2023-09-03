let categoryProduct = localStorage.getItem('catID')
const container = document.getElementById('productsGrid');
const API_URL = `https://japceibal.github.io/emercado-api/cats_products/${categoryProduct}.json`
const searcher = document.getElementById("searcher")
const filterForm = document.getElementById('rangeFilterCount');
let productList;
const sortAscBtn = document.getElementById('ordenAscendente')
const sortDescBtn = document.getElementById('ordenDesendente')
const sortByCount = document.getElementById('ordenRelevancia')


fetch(API_URL)
.then(response => response.json())
.then(data => {
        productList = data.products;
        placeItems(productList)
    })
    .catch(error => console.error('Error:', error));

    
    
function placeItems(products, filter = /./){ // Si solo se le pasa la lista pone todos los elementos, si además se le pasa una condición (expresión regular) filtra los elementos teniendo en cuenta la condicion
    container.innerHTML = ""
    for (let i = 0; i < products.length; i++) {        
        if(filter.test(products[i].name) || filter.test(products[i].description)){
            filter.lastIndex = 0
            const paragraph = document.createElement("p");
            paragraph.innerText = products[i].name;
            let div = document.createElement('div')
            div.classList = ('col-md-3')

            div.innerHTML = `<div class='card' style='width: auto;'><img src='${products[i].image}' class='card-img-top' alt='...'><div class='card-body'><h5 class='card-title'>${products[i].name}</h5><p class='card-text'>${products[i].description}</p><span class='btn btn-primary btn-price'>${products[i].currency} ${products[i].cost}</span></div></div>`

            container.appendChild(div)
        }
    }
}

searcher.addEventListener('input', filterProducts)

sortAscBtn.addEventListener('click', sortAsc)
sortDescBtn.addEventListener('click', sortDesc)
sortByCount.addEventListener('click', sortRel)

// ordena precio ascendente
function sortAsc(){
    productList.sort((a, b) => a.cost - b.cost);
    placeItems(productList)
}

//ordena precio descendente
function sortDesc(){
    productList.sort((a, b) => b.cost - a.cost);
    placeItems(productList)
}

// ordena por relevancia
function sortRel(){
    productList.sort((a, b) => b.soldCount - a.soldCount);
    placeItems(productList)
}

function filterProducts (){
    let reg
    if(searcher.value != ''){
        let value = searcher.value.replace(/[\\[.+*?(){|^$]/g, "\\$&") // Limpia el string de caracteres especiales para que la búsqueda no falle
        reg = new RegExp(value, 'gi')
    }else{
        reg = new RegExp('.') // En caso de estar vacío se asegura de que coincida con todos los resultados
    }
    let items = getValues()
    
    placeItems(items, reg)
}

filterForm.addEventListener('click', ()=>{
    let items = getValues()
    placeItems(items)

});

function getValues() {
    
    let minPrice = parseFloat(document.getElementById('rangeFilterCountMin').value);
    let maxPrice = parseFloat(document.getElementById('rangeFilterCountMax').value);

    if(isNaN(minPrice)){
        minPrice = 0
    }
    if(isNaN(maxPrice)){
        maxPrice = productList.sort((a, b) => b.cost - a.cost)[0].cost
        productList.sort((a, b) => a.id - b.id)
    }
    
    // const sortBy = document.getElementById('sortBy').value;
    let filterProducts = productList.filter((el)=> el.cost <= maxPrice && el.cost >= minPrice)
    return filterProducts
}



const clearRange = document.getElementById('clearRangeFilter')
clearRange.addEventListener('input', function () {console.log('a')})

console.log(clearRange)

function clearInputs(event){
    //document.getElementById('rangeFilterCountMin').value = 0
    //document.getElementById('rangeFilterCountMax').value = 0
    console.log('a', event)
    //placeItems(productList)
}