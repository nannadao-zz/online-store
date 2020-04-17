let cartButtons = document.querySelectorAll(".add-cart");

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

let productsList = [
    {
        name: "Lip 1",
        tag: "lip1",
        price: 5,
        inCart: 0
    },
    {
        name: "Lip 2",
        tag: "lip2",
        price: 6,
        inCart: 0
    },
    {
        name: "Lip 3",
        tag: "lip3",
        price: 7,
        inCart: 0
    },
    {
        name: "Lip 4",
        tag: "lip4",
        price: 8,
        inCart: 0
    },
    {
        name: "Lip 5",
        tag: "lip5",
        price: 9,
        inCart: 0
    },
    {
        name: "Lip 6",
        tag: "lip6",
        price: 10,
        inCart: 0
    },
]

for (let i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener("click", function(){
        cartNumbers(productsList[i]);
        totalCost(productsList[i]);
    })
}

function loadingCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");

    if (productNumbers) {
        document.querySelector("nav span").textContent = productNumbers;
    }
}

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

function totalCost(value) {
    let cartCost = localStorage.getItem('totalCosts');
    
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCosts', cartCost + value.price)
    } else {
        localStorage.setItem('totalCosts', value.price);
    }
    
} 

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems) {
        
    }
}

var removeCartItem = document.getElementsByClassName("remove-item")

for (var i = 0; i < removeCartItem.length; i++) {
    var button = removeCartItem[i];
    button.addEventListener("click", function() {
        var buttonClicked = event.target
        buttonClicked.parentElement.remove()
        
    })
}

function updateCartTotal () {
    let cartCost = localStorage.getItem("totalCosts");

    if (cartCost == undefined) {
        
        document.getElementById("cart-message").style.display = "block"
        
    } else {
        
        cartCost = parseInt(cartCost)
        document.getElementById("cart-total").innerHTML = cartCost
    }
}
updateCartTotal();
loadingCartNumbers();
displayCart();