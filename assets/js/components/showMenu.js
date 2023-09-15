function showMenu() {
    const nav = document.querySelector('.nav')
    const menu = document.querySelector('.nav__menu')
    const modalDOM = document.querySelector(".product__img")
    const cart = document.querySelector('.cart')

    nav.addEventListener('click', e => {
       if (e.target.closest('.btn__menu')) {
        menu.classList.toggle('show__menu')
        modalDOM.classList.remove('show__image')
        cart.classList.remove('show__cart')
       }

       if (e.target.closest('.btn__close')) {
        menu.classList.remove('show__menu')
       }

       if (e.target.closest('.nav__link')) {
        menu.classList.remove('show__menu')
       }
    })
}

export default showMenu