(function renderCheckout() {
  renderProductsForCheckout();

  document.getElementById("emptyCart").addEventListener("click", () => {
    let empty = [];
    localStorage.setItem("cart", JSON.stringify(empty));

    renderProductsForCheckout();
  });
})();
