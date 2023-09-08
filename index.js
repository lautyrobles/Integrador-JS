const productsContainer = document.querySelector(".products-container-cards")
const showMoreBtn = document.querySelector(".show-more")
const categoriesContainer = document.querySelector(".categories")
const categoriesList = document.querySelectorAll(".category")
const cartBtn = document.querySelector(".cart-label")
const cartMenu = document.querySelector(".cart")
const menuBtn = document.querySelector(".menu-label")
const barsMenu = document.querySelector(".navbar-links")
const main = document.querySelector(".main")
const headerLogIn = document.querySelector(".header-log")
const productsCart = document.querySelector(".cart-container")
const total = document.querySelector(".total")
const btnDelete = document.querySelector(".cart-btn-delete")
const btnBuy = document.querySelector(".cart-btn-buy")
const bubble = document.querySelector(".cart-bubble")
const modalMsg = document.querySelector(".active-modal")

const form = document.querySelector("#form")
const nameInput = document.querySelector("#name-input")
const lastNameInput = document.querySelector("#lastname-input")
const mailInput = document.querySelector("#email-input")
const textareaInput = document.querySelector("#textarea")
const modalFormMsg = document.querySelector(".active-form-modal")



const renderProducts = (productsList) => {  
    productsContainer.innerHTML += productsList.map(createProductTemplate).join("")
}

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

const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit - 1;
}

const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add("hidden");
    }
}

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

const renderFilteredProducts = () => {
    const filteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter);
    renderProducts(filteredProducts);
};

const isInactiveFilterBtn = (element) => {
    return (
        element.classList.contains("category") && 
        !element.classList.contains("active")
    )
}

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveFilter(appState.activeFilter);
    setShowMoreVisibility();
}

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

const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
        showMoreBtn.classList.remove("hidden")
        return
    }
    showMoreBtn.classList.add("hidden")
};


const toggleCart = () => {
    cartMenu.classList.toggle("open-cart")
     if (barsMenu.classList.contains("open-menu")) {
         barsMenu.classList.remove("open-menu")
         headerLogIn.classList.remove("open-log")
         return 
     }
}

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


const closeOnClick = (e) => {
    if (e.target.classList.contains("btn-add") && cartMenu.classList.contains("open-cart")) {
        return
    }
    barsMenu.classList.remove("open-menu")
    cartMenu.classList.remove("open-cart")
    headerLogIn.classList.remove("open-log")
}


let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

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

const createCartProductTemplate = (cartProduct) => {
    const {id, name, price, img, quantity} = cartProduct
    return `
    <div class="cart-item">
    <img src="${img}" alt=${name}>
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

const showCartTotal = () => {
    total.innerHTML = `$${getCartTotal()}`
}

const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0)
}

const addProduct = (e) => {
    if (!e.target.classList.contains("btn-add")) {
        return
    }
    const product = createProductData(e.target.dataset);
    if (isExistingCartProduct(product)) {
        addUnitToProduct(product)
        showActiveModal()
    } else {
        createCartProduct(product);
        showActiveModal()
    }
    moreThanTwoProductsCart()
    updateCartState()
}

const moreThanTwoProductsCart = () => {
    if (cart.length > 2) {
        productsCart.classList.add("cart-scroll")
    } else {
        productsCart.classList.remove("cart-scroll")
    }
}

const createProductData = (product) => {
    const {id, name, price, img} = product
    return {id, name, price, img}
}

const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id)
}

const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) => 
    cartProduct.id === product.id
    ? {...cartProduct, quantity: cartProduct.quantity + 1}
    : cartProduct
    )
}

const createCartProduct = (product) => {
    cart = [...cart, {...product, quantity: 1 }]
}

const updateCartState = () => {
    saveCart()
    renderCart()
    showCartTotal()
    inactiveBtn(btnDelete)
    inactiveBtn(btnBuy)
    currentBubbleAmount()
}

const deleteCartProducts = () => {
    cart = []
    moreThanTwoProductsCart()
    updateCartState()
}

const currentBubbleAmount = () => {
    bubble.textContent = cart.reduce((acc, cur) => {
        return acc + cur.quantity
    }, 0)
}

const inactiveBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add("inactive-btn")
        btn.classList.add("inactive-hover")
    } else {
        btn.classList.remove("inactive-btn")
        btn.classList.remove("inactive-hover")
    }
}

const showActiveModal = () => {
    modalMsg.classList.add("show-modal")
    setTimeout(() => {
        modalMsg.classList.remove("show-modal")
    }, 1500)
}

const handleMinusQuantity = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    if (existingCartProduct.quantity === 1) {
        removeProduct(existingCartProduct)
    }
    substractProductUnit(existingCartProduct)
}

const handlePlusQuantity = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id)
    addUnitToProduct(existingCartProduct)
}

const substractProductUnit = (existingProduct) => {
    cart = cart.map((product) => {
        return product.id === existingProduct.id
    ? {...product, quantity: Number(product.quantity) -1}
    : product
    })
}

const removeProduct = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id)
    updateCartState()
}

const handleQuantity = (e) => {
    if (e.target.classList.contains("down")) {
        handleMinusQuantity(e.target.dataset.id)
    } else if (e.target.classList.contains("up")) {
        handlePlusQuantity(e.target.dataset.id)
    }
    updateCartState()
}

/////////////////////

const consults = JSON.parse(localStorage.getItem("consults")) || []
const saveConsultToLocalStorage = () => {
    localStorage.setItem("consults", JSON.stringify(consults))
}

const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max
}

const isEmpty = (input) => {
    return !input.value.trim().length
}

const showError = (input, message) => {
    const formField = input.parentElement
    formField.classList.remove("success")
    formField.classList.add("error")
    const error = formField.querySelector("small")
    error.style.display = "block"
    error.textContent = message
}

const showSuccess = (input) => {
    const formField = input.parentElement
    formField.classList.remove("error")
    formField.classList.add("success")
    const error = formField.querySelector("small")
    error.textContent = ""
}

const checkTextInput = (input) => {
    let valid = false
    const minCharacters = 3
    const maxCharacters = 25
    if(isEmpty(input)) {
        showError(input, `Este campo es obligatorio`)
        return
    }
    if(!isBetween(input, minCharacters, maxCharacters)) {
        showError(input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`)
        return
    }
    showSuccess(input)
    valid = true
    return valid
}

const isEmailValid = (input) => {
    const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/
    return re.test(input.value.trim())
}

const checkEmail = (input) => {
    let valid = false
    if (isEmpty(input)) {
        showError(input, `Este campo es obligatorio`)
        return
    }
    if (!isEmailValid(input)) {
        showError(input, `El mail ingresado no es valido`)
        return
    }
    showSuccess(input)
    valid = true
    return valid
}

const isMaxCharacter = (input, max) => {
    return input.value.length > max
}

const isEmptyTextarea = (textarea) => {
    return !textarea.value.trim().length
}

const showTextareaError = (textarea, message) => {
    const formField = textarea.parentElement
    formField.classList.remove("textarea-success")
    formField.classList.add("textarea-error")
    const error = formField.querySelector("small")
    error.style.display = "block"
    error.textContent = message
}

const showTextareaSuccess = (textarea) => {
    const formField = textarea.parentElement
    formField.classList.remove("textarea-error")
    formField.classList.add("textarea-success")
    const error = formField.querySelector("small")
    error.textContent = ""
}

const checkTextArea = (textarea) => {
    let valid = false
    const maxTextCharacters = 250
    if (isEmptyTextarea(textarea)) {
        showTextareaError(textarea, `Este campo es obligatorio`)
        return
    }
    if (isMaxCharacter(textarea, maxTextCharacters)) {
        showTextareaError(textarea, `El limite de caracteres es de ${maxTextCharacters}`)
        return
    }
    showTextareaSuccess(textarea)
    valid = true
    return valid
}

const showFormModal = () => {
    modalFormMsg.classList.add("show-form-modal")
    setTimeout(() => {
        modalFormMsg.classList.remove("show-form-modal")
    }, 3000);
}

const validateForm = (e) => {
    e.preventDefault()

    let isNameValid = checkTextInput(nameInput)
    let isLastNameValid = checkTextInput(lastNameInput)
    let isEmailValid = checkEmail(mailInput)
    let isTextAreaValid = checkTextArea(textareaInput)
    
    let isValidForm = 
    isNameValid && 
    isLastNameValid && 
    isEmailValid && 
    isTextAreaValid

    if (isValidForm) {
        consults.push({
            name: nameInput.value,
            lastName: lastNameInput.value,
            email: mailInput.value,
            consulta: textareaInput.value
        })
        saveConsultToLocalStorage(consults)
        showFormModal()
        form.reset()
    }
}

const init = () => {
    renderProducts(appState.products[0])
    showMoreBtn.addEventListener("click", showMoreProducts)
    categoriesContainer.addEventListener("click", applyFilter)
    cartBtn.addEventListener("click", toggleCart)
    menuBtn.addEventListener("click", toggleMenu)
    window.addEventListener("scroll", untoggleMenu)
    main.addEventListener("click", closeOnClick)
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", showCartTotal)
    productsContainer.addEventListener("click", addProduct)
    productsCart.addEventListener("click", handleQuantity)
    btnDelete.addEventListener("click", deleteCartProducts)
    moreThanTwoProductsCart()
    inactiveBtn(btnDelete)
    inactiveBtn(btnBuy)

    form.addEventListener("submit", validateForm)
    nameInput.addEventListener("input", () => checkTextInput(nameInput))
    lastNameInput.addEventListener("input", () => checkTextInput(lastNameInput))
    mailInput.addEventListener("input", () => checkEmail(mailInput))
    textareaInput.addEventListener("input", () => checkTextArea(textareaInput))
}
init()

