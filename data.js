const productsData = [ 
    {
    name: "Chaleco Azul Aesthetic",
    id: 1,
    price: 4999,
    category: "dress",
    cardImg: "./assets/dresses/dress-1.png",
},
{
    name: "Chaleco Cuero Rosa",
    id: 2,
    price: 5499,
    category: "dress",
    cardImg: "./assets/dresses/dress-2.png",
},
{
    name: "Camperita Negra Inflable",
    id: 3,
    price: 5299,
    category: "dress",
    cardImg: "./assets/dresses/dress-3.png",
},
{
    name: "Pijama Lilo y Stich",
    id: 4,
    price: 5599,
    category: "dress",
    cardImg: "./assets/dresses/dress-4.png",
},
{
    name: "Chaleco Naranja XL",
    id: 5,
    price: 6499,
    category: "dress",
    cardImg: "./assets/dresses/dress-5.png",
},
{
    name: "Vestido Princess S",
    id: 6,
    price: 6999,
    category: "dress",
    cardImg: "./assets/dresses/dress-6.png",
},
{
    name: "Chaleco Hogwarts M",
    id: 7,
    price: 6499,
    category: "dress",
    cardImg: "./assets/dresses/dress-7.png",
},
{
    name: "Chaleco University M",
    id: 8,
    price: 5999,
    category: "dress",
    cardImg: "./assets/dresses/dress-8.png",
},
{
    name: "Bowl Alimento L",
    id: 9,
    price: 3999,
    category: "accessories",
    cardImg: "./assets/accessories/accessorie-1.png",
},
{
    name: "Bowl Alimento M",
    id: 10,
    price: 2999,
    category: "accessories",
    cardImg: "./assets/accessories/accessorie-2.png",
},
{
    name: "Dispenser Water/Food",
    id: 11,
    price: 7499,
    category: "accessories",
    cardImg: "./assets/accessories/accessorie-3.png",
},
{
    name: "Kit Accesorios Plata",
    id: 12,
    price: 8999,
    category: "accessories",
    cardImg: "./assets/accessories/accessorie-5.png",
},
{
    name: "Kit Accesorios Oro",
    id: 13,
    price: 9999,
    category: "accessories",
    cardImg: "./assets/accessories/accessorie-4.png",
},
{
    name: "Cama Gris M",
    id: 14,
    price: 10999,
    category: "accessories",
    cardImg: "./assets/accessories/accessorie-7.png",
},
{
    name: "Cama Azul XL",
    id: 15,
    price: 11999,
    category: "accessories",
    cardImg: "./assets/accessories/accessorie-6.png",
},
{
    name: "Premiun DogHouse XXL",
    id: 16,
    price: 19499,
    category: "accessories",
    cardImg: "./assets/accessories/accessorie-8.png",
},
]

// 4. Creamos una funcion para dividir los productos en un nuevo array vacio y en la cantidad que queramos mostrar al clickear "Ver Mas" y le damos un tamaño (size)
const divideProducts = (size) => {
    let productList = [];
    for ( let i = 0; i < productsData.length; i += size )
    productList.push(productsData.slice( i, i + size ))
    return productList; 
}

// 5. Creamos un objeto para el estado de la aplicacion (appState) para la cantidad de productos que queremos mostrar y cuando se muestran
const appState = {
    products: divideProducts(6),
    currentProductsIndex: 0,
    productsLimit: divideProducts(6).length,
    activeFilter: null
}