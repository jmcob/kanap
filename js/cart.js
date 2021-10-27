//////////////////////////
//    cart elements     //
//////////////////////////

// la fameuse fonction "getCart" qui recupere le panier ; utilisée plusieurs fois dans la page
function getCart() {
  let items = [];
  if (localStorage.getItem("panier") != null) {
    items = JSON.parse(localStorage.getItem("panier"));
  }
  return items;
}

// La fameuse fonction add2cart qui ajoute au panier sous conditions et dans l'ordre
function add2Cart(productId, color, qty) {
  if (qty == 0) {
    return;
  }
  let items = getCart();
  if (items.length == 0) {
    items = [[productId, color, qty]];
  } else {
    let found = false;
    for (let i = 0; i < items.length; i++) {
      if (productId === items[i][0] && color === items[i][1]) {
        found = true;
        items[i][2] += qty;
      }
    }
    if (found == false) {
      let item = [productId, color, qty];
      items.push(item);
    }
  }
  localStorage.setItem("panier", JSON.stringify(items));
}

// Element HTML du cart
const cartSection = document.getElementById("cart__items");
// Fonction du bouton deleteItem du cart, qui supprime une entrée du local storage
function deleteItem() {
  let items = getCart();
  for (let i = 0; i < items.length; i++) {
    let removedItem = items.splice(i, 1);
    localStorage.setItem("panier", JSON.stringify(items));
    window.location.reload();
  }
}
// La fonction qui récupere la veleur modifiée sur la page de la quantité d'un kanap, et qui met a jour le local storage.
function changeQuantity(id, color, qty) {
  let items = getCart();
  for (let i = 0; i < items.length; i++) {
    if (id === items[i][0] && color === items[i][1]) {
      items[i][2] = qty;
    }
    localStorage.setItem("panier", JSON.stringify(items));
    window.location.reload();
  }
}

// la fonction fetch qui recupere le panier, les data a recuperer en JSON, et les écrit en HTML
function fetchIdData() {
  let items = getCart();
  let qty = 0;
  let price = 0;

  for (let i = 0; i < items.length; i++) {
    let id = items[i][0];
    let color = items[i][1];
    let url = "http://localhost:3000/api/products/" + id;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        cartSection.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
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
                      <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${id}', '${color}', this.value)" min="1" max="100" value="${items[i][2]}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick="deleteItem()">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
        // total price (if qty (items[i][2]))
        price += data.price * items[i][2];
        document.getElementById("totalPrice").innerHTML = price;
      });

    // total Quantity
    qty += items[i][2];
    document.getElementById("totalQuantity").innerHTML = qty;
  }
}

////////////////////////////////////////////////////////////////
// Form elements
////////////////////////////////////////////////////////////////
// email
const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(email) == false) {
    emailErrorMsg.innerHTML = "Entrez une adresse e-mail valide.";
  }
}
// console.log(validateEmail("jmcob@pm.me"));
// console.log(validateEmail("jmcob@pmme"));

// first name
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName() {
  if (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(form.firstName.value)) {
    return true;
  }
  firstNameErrorMsg.innerHTML = "Entrez un prénom valide.";
  return false;
}

// last name
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName() {
  if (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(form.lastName.value)) {
    return true;
  }
  lastNameErrorMsg.innerHTML = "Entrez un nom valide.";
  return false;
}

// City
const cityErrorMsg = document.getElementById("cityErrorMsg");
function validateCity() {
  if (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(form.city.value)) {
    return true;
  }
  cityErrorMsg.innerHTML = "Entrez une commune valide.";
  return false;
}

fetchIdData();
