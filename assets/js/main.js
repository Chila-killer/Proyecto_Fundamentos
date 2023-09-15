import loader from "./components/loader.js";
import showMenu from "./components/showMenu.js";
import showCart from "./components/showCart.js";
import products from "./components/products.js";
import getProducts from "./helpers/getProducts.js";
import cart from "./components/cart.js";
import darkMode from "./components/darkMode.js";


// Ocultar Loader
loader()

// Mostrar menu
showMenu()

// Show cart 
showCart()

// products
const {db, printProducts} = products(await getProducts())

// cart
cart(db, printProducts)

// dark mode
darkMode()

