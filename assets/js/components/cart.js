function cart(db, printProducts) {
    const ls = window.localStorage
    let cart = JSON.parse(ls.getItem('cart')) || []
    // Elementos del DOM
    const productsDOM = document.querySelector('.products__container')
    const notifyDOM = document.querySelector('.notify')
    const cartDOM = document.querySelector('.cart__body')
    const countDOM = document.querySelector('.cart__count__item')
    const totalDOM = document.querySelector('.cart__total__item')
    const checkoutDOM = document.querySelector('.btn__buy')
    // funciones
    function printCart() {
        let htmlCart = ''

        if (cart.length === 0) {
            htmlCart += `
                <div class="cart__empty">
                    <i class='bx bxs-cart'></i>
                    <p class="cart__empty__text">No hay productos en el carrito</p>
                </div>
                `
            notifyDOM.classList.remove('show__notify')
        } else {
            for (const item of cart) {
                const product = db.find(p => p.id === item.id)
                htmlCart += `
                <article class="article">
                    <div class="article__image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="article__content">
                        <h3 class="article__title">${product.name}</h3>
                        <span class="article__price">$${product.price}</span>
                        <div class="article__quantity">
                            <button type="button" class="article__quantity__btn article__minus" data-id="${item.id}">
                                <i class='bx bx-minus' ></i>
                            </button>
                            <span class="article__quantity__text">${item.qty}</span>
                            <button type="button" class="article__quantity__btn article__plus" data-id="${item.id}">
                                <i class='bx bx-plus' ></i>
                            </button>
                        </div>
                        <button type="button" class="article__btn remove__from__cart" data-id="${item.id}">
                            <i class='bx bxs-trash'></i>
                        </button>
                    </div>
                </article>
                `
            }
            notifyDOM.classList.add('show__notify')
        }

        cartDOM.innerHTML = htmlCart
        notifyDOM.innerHTML = showItemsCount()
        countDOM.innerHTML = showItemsCount()
        totalDOM.innerHTML = showTotal()
        
        ls.setItem('cart', JSON.stringify(cart))
    }

    function addToCart(id, qty = 1) {
        const itemFound = cart.find(i => i.id === id)
        const product = db.find(p => p.id === id)
            
        if (itemFound) {
            if (itemFound.qty < product.quantity) {
                itemFound.qty += qty  
            } else {
                window.alert('No hay mas producto en stock')
            }          
        } else {
            cart.push({id, qty})
        }

        printCart()
    }
    
    function removeFromCart (id, qty = 1) {
        const itemFound = cart.find(i => i.id === id)

        const result = itemFound.qty - qty
        if (result > 0) {
            itemFound.qty -= qty
        } else {
            cart = cart.filter(i => i.id !== id)
        }
        printCart() 
    }

    function deleteFromCart(id) {
        cart = cart.filter(i => i.id !== id)
        printCart()
    }

    function showItemsCount() {
        let suma = 0
        for (const item of cart) {
            suma += item.qty
        }
        return suma
    }

    function showTotal() {
        let total = 0
        for (const item of cart) {
            const productsFound = db.find(p => p.id === item.id)
            total += item.qty * productsFound.price 
        }
        return total
    }

    function checkout () {
        for (const item of cart) {
            const productsFound = db.find(p => p.id === item.id)

            productsFound.quantity -= item.qty
        }
        cart = []
        printCart()
        printProducts()
        window.alert(`Gracias por su compra`)
    }

    printCart()

    // Eventos
    productsDOM.addEventListener('click', e => {
        if (e.target.closest('.add__to__cart')) {
            const id = +e.target.closest('.add__to__cart').dataset.id
            addToCart(id)
            
        }
        
    })

    cartDOM.addEventListener('click', e => {
        if (e.target.closest('.article__minus')) {
            const id = +e.target.closest('.article__minus').dataset.id
            removeFromCart(id)
            
        }

        if (e.target.closest('.article__plus')) {
            const id = +e.target.closest('.article__plus').dataset.id
            addToCart(id)
            
        }

        if (e.target.closest('.remove__from__cart')) {
            const id = +e.target.closest('.remove__from__cart').dataset.id
            deleteFromCart(id)
            
        }
    })

    checkoutDOM.addEventListener('click', e => checkout())

    // Show product
    const modalDOM = document.querySelector(".product__img")
    const productDOM = document.querySelector(".products__container")
    const cartClose = document.querySelector('.cart')
    const menu = document.querySelector('.nav__menu')
    
    function printProduct(id) {
        let modal = id
        const product = db.find(p => p.id === modal)
        
        let htmlModule = `<div class="product__img__modal">
        <div class="product__img__header">
            <h3 class="img__title">${product.name}</h3>
            <button type="button" class="img__btn btn__close">
                <i class='bx bxs-x-square'></i>
            </button>
        </div>

        <div class="img__body">
            <article class="product__img__article">
                <div class="article__product__img">
                    <button type="button" class="product__btn__img add__to__cart" data-id="${product.id}">
                        <i class='bx bxs-cart-add' ></i>
                    </button>
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="article__product__content">
                    <span class="product__description">*Descripcion generica Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
                    <span class="article__price">Precio: $${product.price}</span>
                    <span class="product__stock">Disponibles: ${product.quantity}</span>

                    </div>
                    </article>
                    </div>
                    </div>
                    <!-- <div class="article__product__quantity">  
                        <button type="button" class="article__quantity__btn article__minus">
                            <i class='bx bx-minus' ></i>
                        </button>
                        <span class="article__quantity__text">1</span>
                        <button type="button" class="article__quantity__btn article__plus">
                            <i class='bx bx-plus' ></i>
                        </button>
                    </div> -->`
        
    
    
        modalDOM.innerHTML = htmlModule
        
    }
    window.onclick = e => {
        if (e.target.closest('.image')) {
            modalDOM.classList.add('show__image')
            cartClose.classList.remove('show__cart')
            menu.classList.remove('show__menu')
            
            }
    }
    modalDOM.addEventListener('click', e => {
        if (e.target.closest('.btn__close')) {
        modalDOM.classList.remove('show__image')
        }
    })
    productDOM.addEventListener('click', e => {
        if (e.target.closest('.image')) {
            const id = +e.target.closest('.image').dataset.id
            printProduct(id)
            
        }
    })
    modalDOM.addEventListener('click', e => {
        if (e.target.closest('.add__to__cart')) {
            const id = +e.target.closest('.add__to__cart').dataset.id
            addToCart(id)
            
        }
        
    })
    
}

export default cart