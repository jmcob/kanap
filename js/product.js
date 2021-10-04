////////
// getting id of the teddy from the single.html URL
////////
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
console.log("kanap id is " + id);
const objectURL = "http://localhost:3000/api/products/" + id;
console.log("Fetch URL is " + objectURL);

/////////
// Fetching data from backend & DOM
/////////
let cardsFetch = function () {
  fetch(objectURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // get data image
      let img = document.querySelector(".item__img");
      img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
      // data.name and title
      let name = document.getElementById("title");
      name.innerHTML = data.name;
      let title = document.querySelector("title");
      title.innerHTML = data.name;
      // price
      let price = document.getElementById("price");
      price.innerHTML = `${data.price}`;
      // description
      let description = document.getElementById("description");
      description.innerHTML = data.description;
      // colors
      let color = document.getElementById("colors");
      for (i = 0; i < data.colors.length; i++) {
        color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
      }
    });
};
cardsFetch();

//////////
// cart //
//////////
// HTML element : button add to cart
const toCartBtn = document.getElementById("addToCart");

// la fameuse fonction get cart qui recupere le panier.
function getCart() {
  let items = [[]];
  if (localStorage.getItem("panier") != null) {
    items = JSON.parse(localStorage.getItem("panier"));
  }
  return items;
}

// prototype de fonction pour recupere les quantité d'un produit donné dans le panier
function checkIdAndColor(productId, color) {
  let items = getCart();
  for (let i = 0; i < items.length; i++) {
    let pId = localStorage.getItem("panier", items[i][0]);
    if (productId == pId) {
      return color === localStorage.getItem("panier", items[i][1]);
    }
  }
}
// la fonction qui retourne la quantité de kanap deja dans le panier avec la bonne couleur, sa quantité, et rends le i en prime pour s'en servir plus tard
function returnValues(productId, color) {
  let items = getCart();
  for (let i = 0; i < items.length; i++) {
    let pId = localStorage.getItem("panier", items[i][0]);
    if (productId === pId) {
      let clr = localStorage.getItem("panier", items[i][1]);
      if (color === clr) {
        let q = localStorage.getItem("panier", items[i][2]);
        return [pId, clr, q, i];
      }
    }
  }
}
// La fameuse fonction add2cart qui ajoute au panier sous conditions et dans l'ordre
function add2Cart(productId, color, qty) {
  let items = getCart();
  if (items.length == 0) {
    let pId = productId;
    let clr = color;
    let q = qty;
    let items = [[pId, clr, q]];
    localStorage.setItem("panier", JSON.stringify(items));

    console.log(items);
  } else {
    let iFound = false;
    if (items.find(checkIdAndColor)) {
      returnValues(productId, color);
      iFound = true;
      let q = returnValues[2];
      let i = returnValues[3];
      console.log(q, i);
      q += qty;
      items[i][2] = q;
      console.log(items);
    }
    if (iFound == false) {
      let pId = productId;
      let clr = color;
      let q = qty;
      let newItems = [pId, clr, q];
      items.push(newItems);
      console.log(items);
    }
  }
  localStorage.setItem("panier", JSON.stringify(items));
}

// LA fonction qui recupere la valeur du champs quantity dans le markup
function qtyValue() {
  let qty = document.getElementById("quantity");
  return qty.value;
}

// La fonction qui recupere la valeur de la couleur du kanap dans le markup
function colorValue() {
  let color = document.getElementById("colors");
  return color.value;
}

// au bouton toCartBtn, fonction addCart qui active les autres fonction au click
toCartBtn.addEventListener("click", () => {
  let qty = qtyValue();
  let color = colorValue();
  add2Cart(id, color, qty);
});
