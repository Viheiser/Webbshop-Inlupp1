function renderCustomerForThankYou() {
  setInnerHTML(
    createHTMLForCustomer(),
    document.getElementById("customerInfo")
  );
}

function renderProductsForThankYou() {
  setInnerHTML(
    createHTMLForThankYouProducts(getProductsFromCart()),
    document.getElementById("orderedList")
  );
  setInnerHTML(
    createHTMLForTotalPrice(calculateTotalPrice(cartProducts)),
    document.getElementById("totalPrice")
  );
}

/**
 * creates and saves a customer in local storage
 */
function saveCustomerInfo(name, email, phoneNumber, address) {
  let customer = {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
  };

  localStorage.setItem("customer", JSON.stringify(customer));
}

function renderProductsForCheckout() {
  setInnerHTML(
    createHTMLForCheckoutProducts(getProductsFromCart()),
    document.getElementById("checkoutList")
  );
  setInnerHTML(
    createHTMLForTotalPrice(calculateTotalPrice(cartProducts)),
    document.getElementById("totalPrice")
  );
  addEventListenersToCheckoutButtons();
}

/**
 * Empties the 'cart' item in local storage
 */
function emptyCart() {
  let empty = [];
  localStorage.setItem("cart", JSON.stringify(empty));
}

/**
 * @returns products from 'fakestoreapi'
 */
function getProductsFromAPI() {
  return fetch("https://fakestoreapi.com/products")
    .then((resp) => resp.json())
    .catch(() => {
      return null;
    });
}

/**
 * @returns products from localStorage item 'cart' as an array
 */
function getProductsFromCart() {
  cartProducts = JSON.parse(localStorage.getItem("cart"));

  return cartProducts;
}

/**
 * Sets 'element' inner HTML to 'html'
 * @param {*} innerHtml
 * @param {*} element
 */
function setInnerHTML(html, element) {
  element.innerHTML = html;
}

/**
 * Calculates total price from all the products sent though the productsArray
 * @param {*} productsArray
 * @returns
 */
function calculateTotalPrice(productsArray) {
  let totalPrice = 0;
  for (let p of productsArray) {
    totalPrice += p.price * p.quantity;
  }

  return totalPrice;
}

/**
 * Adds EventListeners for click on all the increase, decrease and removes buttons.
 */
function addEventListenersToCheckoutButtons() {
  for (let removeButton of document.querySelectorAll(".remove-product")) {
    removeButton.addEventListener("click", (e) => {
      cart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == e.target.id) {
          cart.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      renderProductsForCheckout();
    });
  }

  for (let incraseButton of document.getElementsByClassName("btn-increase")) {
    incraseButton.addEventListener("click", (e) => {
      cart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == e.target.id) {
          cart[i].quantity++;
          break;
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      renderProductsForCheckout();
    });
  }

  for (let decreaseButton of document.querySelectorAll(".btn-decrease")) {
    decreaseButton.addEventListener("click", (e) => {
      cart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == e.target.id) {
          if (cart[i].quantity > 1) {
            cart[i].quantity--;
          }
          break;
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      renderProductsForCheckout();
    });
  }
}

/**
 * Gets id from the button that caused the event, finds a product with that id and adds it to the cart.
 */
async function addToCartButtonEvent(event) {
  let product = await getProductById(event.target.id);
  if (product != null) {
    addProductToCart(product);
    updateCartQuantityElement();
  } else console.log("Couldn't find product with the ID " + event.target.id);
}

/**
 * Updates the HTML Element that displays the quantity of products in the cart
 */
function updateCartQuantityElement() {
  let quantity = 0;
  if (localStorage.getItem("cart") !== null) {
    cart = JSON.parse(localStorage.getItem("cart"));
    for (let p of cart) {
      quantity += p.quantity;
    }
  }

  document.getElementById("quantity").innerText = `(${quantity})`;
}

/**
 * handles adding the product sent thought the parameter to the array in localStorage called 'cart'
 * Creates the 'cart' item if it doesn't exist
 */
function addProductToCart(product) {
  let inCart = [];

  if (localStorage.getItem("cart") === null)
    localStorage.setItem("cart", JSON.stringify(inCart));

  inCart = JSON.parse(localStorage.getItem("cart"));

  if (inCart.filter((p) => p.id == product.id).length > 0) {
    let index = inCart.findIndex((p) => p.id == product.id);
    inCart[index].quantity++;
  } else {
    product.quantity = 1;
    inCart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(inCart));
}

/**
 * @returns Product with the same id as given in the parameter, if nothings found it returns a null
 */
function getProductById(id) {
  return fetch(`https://fakestoreapi.com/products/${id}`)
    .then((resp) => resp.json())
    .catch(() => {
      return null;
    });
}

/**
 * @param {*} products
 * @returns HTML code containing div elements created from products, made to fit the look of the index page
 */
function createHTMLForIndexProducts(products) {
  let output = "";
  for (let p of products) {
    output += `
            <div class="card m-2 shadow" style="width: 18rem;">
            <img class="card-img-top" src="${p.image}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">${p.title}</h5>
            <p class="card-text">${p.description}</p>
            <p class="card-text font-weight-bold m-2">${p.price}$</p>
            <button id="${p.id}" class="btn btn-primary add-to-cart">Lägg i varukorg</button>
            </div>
            </div>
        `;
  }

  return output;
}

/**
 * @param {*} products
 * @returns HTML code containing li elements created from products, made to fit the look of the checkout page
 */
function createHTMLForCheckoutProducts(products) {
  let output = "";
  for (let p of products) {
    output += `
    <li class="checkout-list-item">
      <div class="cart-product-wrapper">
        <article class="cart-product">
          <div class="cart-product-image">
            <img alt="${p.title}" src="${p.image}">
          </div>
          <div class="cart-product-description">
            <div class="cart-product-title">
              <p>${p.title}</p>
            </div>
          <div class="cart-product-quantity">
            <div class="quantity-form">
              <div class="quantity-container">
                <button class="btn-increase" id="${p.id}">+</button>
                <p class="quantity-form-value">${p.quantity}</p>
                <button class="btn-decrease" id="${p.id}">-</button>
              </div>
              <button class="remove-product" id="${
                p.id
              }" title="Ta bort">&#10005</button>
            </div>
          </div>
          <div class="cart-product-price">
            <span>${
              Math.round((p.price * p.quantity + Number.EPSILON) * 100) / 100
            }$</span>
          </div>
        </article>
      </div>
   </li>
        `;
  }

  return output;
}

/**
 * @param {*} totalPrice
 * @returns HTML code for displaying total price
 */
function createHTMLForTotalPrice(totalPrice) {
  let output = `
      <div class="checkout-total-price-wrapper">
          <div class="checkout-total-price">
              <div class="total-price-description">
                  Totalt: 
              </div>
              <div class="total-price-price">
                  ${Math.round((totalPrice + Number.EPSILON) * 100) / 100}$
              </div>
          </div>
      </div>
    `;

  return output;
}

/**
 * @param {*} products
 * @returns HTML code containing li elements created from products, made to fit the look of the thankyou page
 */
function createHTMLForThankYouProducts(products) {
  let output = "";
  for (let p of products) {
    output += `
      <li class="checkout-list-item">
        <div class="cart-product-wrapper">
          <article class="cart-product">
            <div class="cart-product-image">
              <img alt="${p.title}" src="${p.image}">
            </div>
            <div class="cart-product-description">
              <div class="cart-product-title">
                <p>${p.title}</p>
              </div>
            <div class="cart-product-quantity">
              <div class="quantity-form">
                <div class="quantity-container">
                  <p class="quantity-form-value">${p.quantity} st</p>
                </div>
              </div>
            </div>
            <div class="cart-product-price">
              <span>${
                Math.round((p.price * p.quantity + Number.EPSILON) * 100) / 100
              }$</span>
            </div>
          </article>
        </div>
     </li>
          `;
  }

  return output;
}

/**
 * @returns HTML code from the customer item in local storage
 */
function createHTMLForCustomer() {
  let customer = JSON.parse(localStorage.getItem("customer"));
  return `<h4>Beställarens info</h4>
          <p>Namn: ${customer.name}</p>
          <p>E-post: ${customer.email}</p>
          <p>Telefon: ${customer.phoneNumber}</p>
          <p>Adress: ${customer.address}</p>`;
}
