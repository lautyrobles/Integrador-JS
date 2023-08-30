// Agarramos los elementos que vamos a utilizar para la seccion de categorias
const productsContainer = document.querySelector(".products-container-cards")
const showMoreBtn = document.querySelector(".show-more")
const categoriesContainer = document.querySelector(".categories")
const categoriesList = document.querySelectorAll(".category")
// Agarramos los elementos que vamos a utilizar para el carrito
const cartBtn = document.querySelector(".cart-label")
const cartMenu = document.querySelector(".cart")
const menuBtn = document.querySelector(".menu-label")
const barsMenu = document.querySelector(".navbar-links")
const main = document.querySelector(".main")
const headerLogIn = document.querySelector(".header-log")
const productsCart = document.querySelector(".cart-container")
const total = document.querySelector(".total")

////////////// CATEGORIAS ///////////////

// 2. Creamos la funcion para renderizar los productos en el contenedor
const renderProducts = (productsList) => {  
    productsContainer.innerHTML += productsList.map(createProductTemplate).join("")
}

// 3. Creamos la funcion para recibir la informacion de cada producto en un molde y mostrarlos
const createProductTemplate = (product) => {
    const { name, id, price, cardImg } = product
    return `
    <div class="products">
    <div class="products-cards">
        <div class="product-img">
        <img src=${cardImg} alt=${name}>
        </div>
        <div class="product-title">
            <h3>${name}</h3>
            <p>$${price}</p>
        </div>
        <div class="btn">
            <button class="btn-add" data-id='${id}' data-name='${name}' data-price='${price}' data-img='${cardImg}'>Agregar al carrito</button>
        </div>
    </div>
</div>
    `
}

// 7. Creamos una funcion para saber si lo que estamos renderizando es el ultimo grupo de productos, para sacar el boton de "Ver Mas"
const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit - 1;
}

// 6. Creamos la funcion para mostrar mas productos al clickear "Ver Mas"
const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add("hidden");
    }
}

// 8. Creamos la funcion para aplicar el filtro. En esta funcion se desestructura el target del evento para saber en que categoria se esta clickeando
const applyFilter = ({ target }) => {
    if (!isInactiveFilterBtn(target)) return;
    changeFilterState(target)
    productsContainer.innerHTML = '';
    if (appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductsIndex = 0
        return;
    }
    renderProducts(appState.products[0]);
}

// 13. Creamos una funcion para renderizar los productos filtrados
const renderFilteredProducts = () => {
    const filteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter);
    renderProducts(filteredProducts);
};

// 9. Creamos una funcion para saber si el usuario esta clickeando en una categoria que no esta activa. 
const isInactiveFilterBtn = (element) => {
    return (
        element.classList.contains("category") && 
        !element.classList.contains("active")
    )
}

// 10. Creamos una funcion para cambiar el estado del activeFilter
const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveFilter(appState.activeFilter);
    setShowMoreVisibility();
}

// 11. Creamos la funcion para cambiar el estado del boton que se esta clickeando
const changeBtnActiveFilter = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return;
        }
        categoryBtn.classList.add("active");
    })
}

// 12. Creamos una funcion para esconder o visualizar el boton de "Ver Mas" segun corresponda 
const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
        showMoreBtn.classList.remove("hidden")
        return
    }
    showMoreBtn.classList.add("hidden")
};

//////////////////////// MENU HAMBURGUESA ///////////////////////////

// 1. Creamos la funcion para mostrar el menu del carrito

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart")
     if (barsMenu.classList.contains("open-menu")) {
         barsMenu.classList.remove("open-menu")
         headerLogIn.classList.remove("open-log")
         return 
     }
}

// 2. Creamos dos funciones para abrir y cerrar los menues
const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu")
    headerLogIn.classList.toggle("open-log")
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart")
        return
    }
}

const untoggleMenu = () => {
    if (barsMenu.classList.contains("open-menu")) {
        barsMenu.classList.remove("open-menu")
        headerLogIn.classList.remove("open-log")
    }
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart")
    }
    return
}

// 3. Creamos una funcion para cerrar los menues al clickear en el main

const closeOnClick = () => {
    barsMenu.classList.remove("open-menu")
    cartMenu.classList.remove("open-cart")
    headerLogIn.classList.remove("open-log")
}

// 4. Guardamos los items que vayamos a agregar en LocalStorage

const cart = JSON.parse(localStorage.getItem("cart")) || [];

// 5. Creamos una funcion para guardar nuestros productos en LocalStorage
const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

/// 6. Creamos una funcion para renderizar los productos en el carrito o mostrar el mensaje de carrito vacio
const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML = `
        <div class="empty-message">
                <p>No tienes ningun producto en el carrito</p>
            </div> 
        `
        return
    } 
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
}

// 7. Creamos el template para los productos del carrito
const createCartProductTemplate = (cartProduct) => {
    const {id, name, price, cardImg, quantity} = cartProduct
    return `
    <div class="cart-item">
    <img src=${cardImg} alt=${name}>
    <div class="item-data">
    <div class="item-info">
        <h4>${name}</h4>
        <span class="item-price">$${price}</span>
    </div>
    <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
</div>
</div>
    `
}

// 8. Creamos una funcion para mostrar el total de la compra
const showCartTotal = () => {
    total.innerHTML = `$${getCartTotal()}`
}

const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0)
}

// 10. Funcion para desestructurar la informacion del producto que estamos agregando
const createProductData = (product) => {
    const {id, name, price, cardImg} = product
    return {id, name, price, cardImg}
}

// 9. Creamos la funcion para agregar el producto al presionar el target de nuestra card ("Agregar al carrito")
const addProduct = (e) => {
    if (!e.target.classList.contains("btn-add")) {
        return
    }
    const product = createProductData(e.target.cartProduct.dataset);
    if (isExistingCartProduct(product)) {
        addUnitToProduct(product)
    } else {
        createCartProduct(product)
    }
    updateCartState()
}
// 11. Creamos una funcion para comprobar si el producto ya esta en el carrito
const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id)
}

// 12. Creamos la funcion para agregar la unidad al producto que ya tengo en el carrito
const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) => 
    cartProduct.id === product.id
    ? {...cartProduct, quantity: cartProduct.quantity + 1}
    : cartProduct
    )
}

// 13. Creamos una funcion para agregar un producto nuevo al carrito
const createCartProduct = (product) => {
    cart = [...cart, {...product, quantity: 1}]
}

// 13. Creamos una funcion para actualizar el carrito al refrescar la pagina
const updateCartState = () => {
    saveCart()
    renderCart()
    showCartTotal()
}

// 1. Creamos la funcion inicializadora (init)
const init = () => {
    renderProducts(appState.products[0])
    showMoreBtn.addEventListener("click", showMoreProducts)
    categoriesContainer.addEventListener("click", applyFilter)
    cartBtn.addEventListener("click", toggleCart)
    menuBtn.addEventListener("click", toggleMenu)
    window.addEventListener("scroll", untoggleMenu)
    main.addEventListener("click", closeOnClick)
    /// agregar productos al carrito//
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", showCartTotal)
    productsContainer.addEventListener("click", addProduct)
}
init()

