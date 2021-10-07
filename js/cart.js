// la fameuse fonction get cart qui recupere le panier.
function getCart() {
  let items = [];
  if (localStorage.getItem("panier") != null) {
    items = JSON.parse(localStorage.getItem("panier"));
  } else {
    cartSection.innerHTML = "Votre panier est vide";
  }
  return items;
}
// la fonction qui va chercher le json du backend
let cardsFetch = function () {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let cartSection = document.getElementById("cart__items");

      let items = getCart();

      for (let i = 0; i < items.length; i++) {
        let id = items[i][0];
        for (let j = 0; j < data.length; j++) {
          if ((data[i][1] = id)) {
            cartSection.innerHTML = `<article class="cart__item" data-id="${id}">
          <div class="cart__item__img">
          <img src="${data[i].imageUrl}"></ alt="${data[i].altTxt}">`;
          }
        }
      }
      // <!--  <article class="cart__item" data-id="{product-ID}">
      //    <div class="cart__item__img">
      //      <img src="../images/product01.jpg" alt="Photographie d'un canapé">
      //    </div>
      //    <div class="cart__item__content">
      //      <div class="cart__item__content__titlePrice">
      //        <h2>Nom du produit</h2>
      //        <p>42,00 €</p>
      //      </div>
      //      <div class="cart__item__content__settings">
      //        <div class="cart__item__content__settings__quantity">
      //          <p>Qté : </p>
      //          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
      //        </div>
      //        <div class="cart__item__content__settings__delete">
      //          <p class="deleteItem">Supprimer</p>
      //        </div>
      //      </div>
      //    </div>
      //  </article> -->
    });
};
cardsFetch();
