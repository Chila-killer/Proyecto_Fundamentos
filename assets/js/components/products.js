function products(products) {
    const db = [...products]

    function printProducts() {
        const productsDOM = document.querySelector('.products__container')
        let htmlProducts = ''

        for (const product of db) {
            htmlProducts += `<article class="product">
            <div class="product__image">
            <img src="${product.image}" alt="${product.name}" class="image" data-id="${product.id}">
            </div>
            <div class="product__content">
                <button type="button" class="product__btn add__to__cart" data-id="${product.id}">
                    <i class='bx bxs-cart-add' ></i>
                </button>
                <span class="product__stock">Disponibles: ${product.quantity}</span>
                <span class="product__price">$${product.price}</span>
                <h3 class="product__title">${product.name}</h3>
            </div>
        </article>`
        }

        productsDOM.innerHTML = htmlProducts
    }
    printProducts() 

    return {
        db,
        printProducts
    }
}

export default products 