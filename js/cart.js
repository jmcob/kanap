//////////////////////////
//    cart elements     //
//////////////////////////

// getCart function gets the cart from localStorage ; used multiple times
function getCart() {
  let items = [];
  if (localStorage.getItem("panier") != null) {
    items = JSON.parse(localStorage.getItem("panier"));
  }
  return items;
}

// add2cart function adds the selected kanap to the localStorage, depending on if it's already here or not in the localStorage
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

// function deleItem deletes a selected entry from the localStorage
function deleteItem() {
  let items = getCart();
  for (let i = 0; i < items.length; i++) {
    let removedItem = items.splice(i, 1);
    localStorage.setItem("panier", JSON.stringify(items));
    window.location.reload();
  }
  if (items.length == 0) {
    localStorage.clear();
  }
}
// function changeQuantity makes the localStorage quantity reflect whats the user chosses on the HTML page
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
// Element HTML du cart
const cartSection = document.getElementById("cart__items");
const cartOrder = document.getElementsByClassName("cart__order");
const cartPrice = document.getElementsByClassName("cart__price");
const h1 = document.getElementsByTagName("h1");

// fetch function gets the data from backend to fill the properties of the kanaps on cart.html page
function fetchIdData() {
  let items = getCart();
  let qty = 0;
  let price = 0;
  if (localStorage.getItem("panier") != null) {
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
  } else {
    h1[0].innerHTML = `Votre panier est vide`;
    cartOrder[0].innerHTML = "";
    cartPrice[0].innerHTML = "";
  }
}

////////////////////////////////////////////////////////////////
// Form elements & POST request ////////////////////
////////////////////////////////////////////////////////////////

//// REGEXs
// valeurs des champs en variables const
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("address");
const mail = document.getElementById("email");
// email
const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(mail) {
  const regexMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexMail.test(mail) == false) {
    return false;
  } else {
    emailErrorMsg.innerHTML = null;
    return true;
  }
}
// simple RegEx for names : accepted characters by RegEx
const regexName = /[A-Z]/gi;
// first name
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
  if (regexName.test(prenom) == false) {
    return false;
  } else {
    firstNameErrorMsg.innerHTML = null;
    return true;
  }
}

// last name
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
  if (regexName.test(nom) == false) {
    return false;
  } else {
    lastNameErrorMsg.innerHTML = null;
    return true;
  }
}

// city
const cityErrorMsg = document.getElementById("cityErrorMsg");
function validateCity(ville) {
  if (regexName.test(ville) == false) {
    return false;
  } else {
    cityErrorMsg.innerHTML = null;
    return true;
  }
}

//REGEX addresses :
const regexAddress = /./;
const addressErrorMsg = document.getElementById("addressErrorMsg");
function validateAddress(adresse) {
  if (regexName.test(adresse) == false) {
    return false;
  } else {
    addressErrorMsg.innerHTML = null;
    return true;
  }
}

//////////// POST request
// generation of the JSON to post
// extracted from backend :
/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
// fonction getForm() qui genere le"contact" du formulaire

function makeJsonData() {
  let contact = {
    firstName: prenom,
    lastName: nom,
    address: adresse,
    city: ville,
    email: mail,
  };
  let items = getCart();
  let products = [];
  for (i = 0; i < items.length; i++) {
    products.push(items[i][0]);
    // if (products.find(items[i][0])) {
    //   products.pop();
    // }
  }
  let jsonData = JSON.stringify({ contact, products });
  return jsonData;
}
// anonymous function with addEventListener that fetches 'postUrl' et posts 'contact' and 'products' to retrieve the confirmation page URL
const postUrl = "http://localhost:3000/api/products/order/";
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => {
  e.preventDefault(); //prevent default form button action
  // prevent fetch to post without REGEXs permission :
  let email = validateEmail(mail.value);
  let firstName = validateFirstName(prenom.value);
  let lastName = validateLastName(nom.value);
  let address = validateAddress(adresse.value);
  let city = validateCity(ville.value);
  if (
    email == false ||
    firstName == false ||
    lastName == false ||
    address == false ||
    city == false
  ) {
    if (email == false) {
      emailErrorMsg.innerHTML = "Entrez une adresse e-mail valide.";
    }
    if (firstName == false) {
      firstNameErrorMsg.innerHTML = "Entrez un prénom valide sans chiffre.";
    }
    if (lastName == false) {
      lastNameErrorMsg.innerHTML = "Entrez un nom valide sans chiffre.";
    }
    if (city == false) {
      cityErrorMsg.innerHTML = "Entrez une commune valide sans chiffre.";
    }
    if (address == false) {
      addressErrorMsg.innerHTML = "Entrez une adresse.";
    }
    return;
  }
  let jsonData = makeJsonData();
  fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((res) => res.json())
    // to check res.ok status in the network
    .then((data) => {
      localStorage.clear();
      let confirmationUrl = "./confirmation.html?id=" + data.orderId;
      window.location.href = confirmationUrl;
    })
    .catch(() => {
      alert("Une erreur est survenue, merci de revenir plus tard.");
    }); // catching errors
});

fetchIdData();
