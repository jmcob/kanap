// Element HTML du cart
const cartSection = document.getElementById("cart__items");

// la fameuse fonction get cart qui recupere le panier.
function fetchIdData() {
  let items = [];
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
      });
  }
}

// total price (if qty)
// let price = 0;
// price += data[j].price * items[i][2];
// document.getElementById("totalPrice").innerHTML = price;
// total Quantity
// let qty = 0;
// qty += items[i][2];
// document.getElementById("totalQuantity").innerHTML = qty;

//fonction pour supprimer un item du storage et changer son HTML

const article = document.getElementsByTagName("article");
const deleteItem = document.getElementsByClassName("deleteItem");

// const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
// function ValidateEmail(mail) {
//   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value)) {
//     return true;
//   }
//   firstNameErrorMsg.innerHTML = `Entrez une adresse email valide s'il vous plait`;
//   return false;
// }
fetchIdData();

