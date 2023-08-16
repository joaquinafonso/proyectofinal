fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
    .then(response => response.json())
    .then(data => {
        const productList = data.products;

        const productListDiv = document.getElementById("productList");
        productList.forEach(product => {
            const productDiv = document.createElement("div");

            const productName = document.createElement("h2");
            productName.textContent = product.name;

            const productDescription = document.createElement("p");
            productDescription.textContent = product.description;

            const productPrice = document.createElement("p");
            productPrice.textContent = `Precio: ${product.cost} ${product.currency}`;

            const productSoldCount = document.createElement("p");
            productSoldCount.textContent = `Vendidos: ${product.soldCount}`;

            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;

            productDiv.appendChild(productName);
            productDiv.appendChild(productDescription);
            productDiv.appendChild(productPrice);
            productDiv.appendChild(productSoldCount);
            productDiv.appendChild(productImage);

            productListDiv.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error:', error));