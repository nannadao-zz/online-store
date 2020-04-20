let cartButtons = document.querySelectorAll(".add-cart");

/* Product List */
let productsList = [
    {
        name: "Lip 1",
        tag: "lip1",
        price: 5,
        inCart: 0,
        id: 1
    },
    {
        name: "Lip 2",
        tag: "lip2",
        price: 6,
        inCart: 0,
        id: 2
    },
    {
        name: "Lip 3",
        tag: "lip3",
        price: 7,
        inCart: 0,
        id: 3
    },
    {
        name: "Lip 4",
        tag: "lip4",
        price: 8,
        inCart: 0,
        id: 4
    },
    {
        name: "Lip 5",
        tag: "lip5",
        price: 9,
        inCart: 0,
        id: 5
    },
    {
        name: "Lip 6",
        tag: "lip6",
        price: 10,
        inCart: 0,
        id: 6
    },
]

/* Set function to Add To Cart buttons */
for (let i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener("click", function(){
        cartNumbers(productsList[i]);
        totalCost(productsList[i]);
    })
}

/* Set function to count added to cart items in Local storage */
function cartNumbers(value) {
    let productNumbers = localStorage.getItem("cartNumbers");

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector("nav span").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector("nav span").textContent = 1;
    } 

    setProducts(value);
}

/* Set function to update products info into local storage */
function setProducts(value) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if(cartItems[value.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [value.tag]: value
            }
        }
        cartItems[value.tag].inCart += 1;
    } else {
        value.inCart = 1;
        cartItems = {
            [value.tag]: value
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

/* Set function to update cart total in local storage */
function totalCost(value) {
    let cartCost = localStorage.getItem('totalCosts');
    
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCosts', cartCost + value.price)
    } else {
        localStorage.setItem('totalCosts', value.price);
    }
    
} 

/* Set function to update cart number to navigation bar */
function loadingCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    if (productNumbers) {
        document.querySelector("nav span").textContent = productNumbers;
    }
}

/* Set function to display cart-overlay */
let cartIcon = document.getElementById("cart-icon");

cartIcon.addEventListener("click", function(){
    document.getElementById("cart-overlay").style.display="block";
});

let closeCart1 = document.getElementById("close-cart");
let closeCart2 = document.getElementById("cart-overlay-empty");

closeCart2.addEventListener("click",function(){
    document.getElementById("cart-overlay").style.display="none";

});

closeCart1.addEventListener("click",function(){
    document.getElementById("cart-overlay").style.display="none"
});

/* Set function to display cart total in cart-overlay */
function loadCartTotal() {
    let cartTotal = localStorage.getItem("totalCosts")
    document.getElementById("cart-total").innerHTML = cartTotal
}

/* Set function to display added-to-cart items in cart-overlay */
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartContent = document.getElementsByClassName("cart-content")[0]

    if (cartContent && cartItems) {
        cartContent.innerHTML = " ";
        Object.values(cartItems).map(item => {
            cartContent.innerHTML += `
            <div id="cart-item">
                <button class="remove-item" data-id=${item.id}> x </button>
                <img src="/shop-img/${item.tag}.jpg">
                <div class="cart-item-info">
                     <h4 class="cart-item-name"> ${item.name} </h4>
                     <h5 class="cart-item-price"> ${item.price} € </h5>
                    <div class="cart-item-control">
                            <button class="cart-remove-item" data-id=${item.id}> - </button>
                            <input class="cart-item-quantity" type="number" min="1" max="10" value="${item.inCart}">
                            <button class="cart-add-item" data-id=${item.id}> + </button>
                    </div>
                </div>
            </div>
            `
        })
    }
}

let cart = [];

loadCartTotal();
loadingCartNumbers();
displayCart();