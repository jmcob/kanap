// Element HTML du cart
const cartSection = document.getElementById("cart__items");

// la fameuse fonction get cart qui recupere le panier.
function fetchIdData() {
  let items = [];
  let qty = 0;
  let price = 0;

  if (localStorage.getItem("panier") != null) {
    items = JSON.parse(localStorage.getItem("panier"));
  } else {
    cartSection.innerHTML = `<article class="cart__item"><p>Votre panier est vide</p>`;
  }
  for (let i = 0; i < items.length; i++) {
    let id = items[i][0];
    let url = "http://localhost:3000/api/products/" + id;
    console.log("URL is " + url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        cartSection.innerHTML += `<article class="cart__item" data-id="${id}">
                <div class="cart__item__img">
                  <img src="${data.imageUrl}" alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${data.name}</h2>
                    <p>${data.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${items[i][2]}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
        // total price (if qty)
        price += data.price * items[i][2];
        document.getElementById("totalPrice").innerHTML = price;
      });
    // total Quantity
    qty += items[i][2];
    document.getElementById("totalQuantity").innerHTML = qty;
  }
}

const article = document.getElementsByTagName("article");
const deleteItem = document.getElementsByClassName("deleteItem");

fetchIdData();
