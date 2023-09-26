function showCart() {
    const btnCart = document.querySelector('.btn__cart')
    const cart = document.querySelector('.cart')
    const modalDOM = document.querySelector(".product__img")
    const menu = document.querySelector('.nav__menu')
    const cartHeader = document.querySelector('.nav__cart')
    const navSupport = document.querySelector('.nav__support') 
    const support = document.querySelector('.support__modal')

    btnCart.addEventListener('click', e => {
        cart.classList.toggle('show__cart')
        modalDOM.classList.remove('show__image')
        menu.classList.remove('show__menu')
    })
    cart.addEventListener('click', e => {
        if (e.target.closest('.btn__close')) {
            cart.classList.remove('show__cart')
       }
    })
    cartHeader.addEventListener('click', e => {
        cart.classList.add('show__cart')
        modalDOM.classList.remove('show__image')
    })
    navSupport.addEventListener('click', e => {
        support.classList.add('show__support')
        modalDOM.classList.remove('show__image')
    })
    support.addEventListener('click', e => {
        if (e.target.closest('.btn__close')) {
            support.classList.remove('show__support')
       }
    })
}

export default showCart