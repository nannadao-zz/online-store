
const cartNumber = document.querySelector("nav span");
const cartTotal = document.querySelector("#cart-total")
const cartContent = document.querySelector(".cart-content")


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

// cart
let cart = []
let buttonsMain = []

// products
class Products {
    async getProducts(){
        let result = productsList;
        return result;
    } catch (error) {
        console.log(error)
    }
}

// display of page
class UI {
    /* display products dynamically */
    displayProducts(products) {
        let productContent = document.getElementsByClassName("products-container")[0]
        productContent.innerHTML = "";
        products.forEach(products => {
            productContent.innerHTML += `
            <div class="product-image"> 
            <img src="shop-img/${products.tag}.jpg">
            <div class="product-info"> 
              <p class="product-name"> ${products.name} </p>
              <p class="product-price"> ${products.price} € </p>
              <button class="add-cart" data-id=${products.id}> ADD TO CART </button> 
            </div>
            `
        });
    };

    addToCartButtons() {
        const buttons = [...document.querySelectorAll(".add-cart")];
        buttonsMain = buttons;
        buttons.forEach(button => {
            let idNumber = button.dataset.id;
            let inCart = cart.find(item => item.id == button.dataset.id);
            if(inCart) {
                button.innerText = "IN CART"
                button.disabled = true;
            }
            button.addEventListener('click', event => {
                event.target.innerText = 'IN CART';
                button.disabled = true
                let addedItem = {...Storage.getProduct(idNumber),amount:1}
                cart = [...cart,addedItem]
                Storage.saveCartItem() // save clicked items to storage
                this.saveCartAmount(cart) //add to over-lay
                this.addCartAmount(addedItem)
            })
        })   
    }

    saveCartAmount(value) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount
        })
        cartNumber.innerText = parseFloat(itemsTotal)
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
    }

    addCartAmount(item) {
        const div = document.createElement('div')
        div.classList.add("cart-item");
    
        div.innerHTML += `
            <button class="remove-item" data-id=${item.id}> x </button>
            <img src="/Online Store/online-store/shop-img/${item.tag}.JPG">
            <div class="cart-item-info">
                <h4 class="cart-item-name"> ${item.name} </h4>
                <h5 class="cart-item-price"> ${item.price} € </h5>
                <div class="cart-item-control">
                    <button class="cart-remove-item" data-id=${item.id}> - </button>
                    <input class="cart-item-quantity" type="number" min="1" max="10" value="${item.amount}">
                    <button class="cart-add-item" data-id=${item.id}> + </button>
                </div>
            </div>
            `
            cartContent.appendChild(div)
    }

    showCart() {
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
    }

    setupApp() {
        cart = Storage.getCart()
        this.saveCartAmount(cart);
        this.populateCart(cart);
    }

    populateCart(cart) {
        cart.forEach(item => this.addCartAmount(item))
    }

    cartFunctions() {
        cartContent.addEventListener('click', event => {
            if (event.target.classList.contains('remove-item')) {
                let removeItem = event.target
                let id = removeItem.dataset.id
                this.removeItem(id)
                cartContent.removeChild(removeItem.parentElement)
            }
            else if (event.target.classList.contains('cart-add-item')) {
                let addItem = event.target
                let id = parseInt(addItem.dataset.id)
                let selectedItem = cart.find(item => item.id === id)
                selectedItem.amount += 1
                Storage.saveCartItem(cart)
                this.saveCartAmount(cart)
                addItem.previousElementSibling.value = selectedItem.amount
            }
            else if (event.target.classList.contains('cart-remove-item')) {
                let removeSingleItem = event.target
                let id = removeSingleItem.dataset.id
                let selectedItem = cart.find(item => item.id === parseInt(id))
                selectedItem.amount -= 1
                if (selectedItem.amount > 0) {
                    Storage.saveCartItem(cart)
                    this.saveCartAmount(cart)
                    removeSingleItem.nextSiblingElement.value = selectedItem.amount
                } else {
                    cartContent.removeChild(removeSingleItem.parentElement.parentElement.parentElement)
                    this.removeItem(id)
                }
            }
        })
    }

    removeItem(id) {
        // to reset cart array
        cart = cart.filter(item => item.id !== parseInt(id))
        // to reset ADD TO CART button functionality
        let button = buttonsMain.find(item => item.dataset.id === id)
        button.disabled = false
        button.innerText = 'ADD TO CART'
        // to reset Storage 
        Storage.saveCartItem(cart)
        // to update cart overlay + total
        this.saveCartAmount(cart)
    }
}

// local storage set up
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    static getProduct(value) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(item => item.id == value)
    }

    static saveCartItem() {
        localStorage.setItem('cartItems', JSON.stringify(cart))
    }

    static getCart() {
        return localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
// setup Web
ui.setupApp()

// display methods
products.getProducts().then(data => { 
    ui.displayProducts(data);
    Storage.saveProducts(data);
}).then(() => {
    ui.addToCartButtons()
    ui.showCart()
    ui.cartFunctions()
});
})

