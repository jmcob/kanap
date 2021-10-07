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
        for (let j = 0; j < data.length; j++) {
          if (data[j]._id == items[i][0]) {
            cartSection.innerHTML += `<article class="cart__item" data-id="${items[i][0]}">
          <div class="cart__item__img">
          <img src="${data[j].imageUrl}"></ alt="${data[j].altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
              <h2>${data[j].name}</h2>
              <p>${data[j].price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${items[i][2]}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p id="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;
          }
        }
      }
    });
};
cardsFetch();
