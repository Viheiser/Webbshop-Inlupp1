(async function renderIndex() {
  let products = await getProductsFromAPI();
  setInnerHTML(
    createHTMLForIndexProducts(products),
    document.getElementById("productContainer")
  );

  for (let btn of document.getElementsByClassName("add-to-cart")) {
    btn.addEventListener("click", addToCartButtonEvent);
  }

  updateCartQuantityElement();
})();
