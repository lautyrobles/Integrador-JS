// Agarramos los elementos que vamos a utilizar para la seccion de categorias
const productsContainer = document.querySelector(".products-container-cards")
const showMoreBtn = document.querySelector(".show-more")
const categoriesContainer = document.querySelector(".categories")
const categoriesList = document.querySelectorAll(".category")
// Agarramos los elementos que vamos a utilizar para el carrito
const cartBtn = document.querySelector(".cart-label")
const cartMenu = document.querySelector(".cart")
const menuBtn = document.querySelector(".menu-label")
const barsMenu = document.querySelector("navbar-links")

////////////// CATEGORIAS ///////////////

// 2. Creamos la funcion para renderizar los productos en el contenedor
const renderProducts = (productsList) => {  
    productsContainer.innerHTML += productsList.map(createProductTemplate).join("")
}

// 3. Creamos la funcion para recibir la informacion de cada producto en un molde y mostrarlos
const createProductTemplate = (product) => {
    const { name, id, price, category, cardImg } = product
    return `
    <div class="products">
    <div class="products-cards">
        <div class="product-img">
        <img src=${cardImg} alt=${name}>
        </div>
        <div class="product-title">
            <h3>${name}</h3>
            <p>${price}</p>
        </div>
        <div class="btn">
            <button data-id=${id} data-name=${name} data-price=${price} data-img=${cardImg}><a href="#">Agregar al carrito</a></button>
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

// 1. Creamos la funcion inicializadora (init)

//////////////////////// MENU HAMBURGUESA ///////////////////////////

// 1. Creamos la funcion para mostrar el menu del carrito

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart")
    if (barsMenu.classList.contains("open-menu")) {
        barsMenu.classList.remove("open-menu")
        return 
    }
}

const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu")
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart")
        return
    }
}

const init = () => {
    renderProducts(appState.products[0])
    showMoreBtn.addEventListener("click", showMoreProducts)
    categoriesContainer.addEventListener("click", applyFilter)
    cartBtn.addEventListener("click", toggleCart)
    menuBtn.addEventListener("click", toggleMenu)
}
init()