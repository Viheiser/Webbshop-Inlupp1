(function renderCheckout() {
  renderProductsForCheckout();

  document.getElementById("emptyCart").addEventListener("click", () => {
    emptyCart();
    renderProductsForCheckout();
  });
})();
