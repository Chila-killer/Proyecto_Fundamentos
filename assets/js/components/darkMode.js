function darkMode() {
    const btnDark = document.querySelector('.btn__dark')
    const body = document.querySelector('.body')
    const containers = document.querySelector('.product__content')

    btnDark.addEventListener('click', e => {
        body.classList.toggle('dark__mode')
        containers.classList.toggle('dark__mode__content')
    })
}

export default darkMode