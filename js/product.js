////////
// getting id of the teddy from the single.html URL
////////
const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
console.log("kanap idis " + id);
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

function getCart() {
  let items = [];
  if (localStorage.getItem("panier") != null) {
    items = JSON.parse(localStorage.getItem("panier"));
  }
  return items;
}

function matchId(productId) {
  return productId === id;
}

function add2Cart(productId, qty, color) {
  let items = getCart();
  if (items.length == 0) {
    items = [productId, qty, color];
  } else {
    let iFound = false;
    for (let i = 0; i < items.length; i++) {
      if (items.find(matchId)) {
        items[qty] += qty;
        iFound = true;
      }
    }
    if (iFound == false) {
      items += [productId, qty, color];
      console.log(items);
    }
  }
  localStorage.setItem("panier", JSON.stringify(items));
}

function qtyValue() {
  let qty = document.getElementById("quantity");
  return qty.value;
}

function colorValue() {
  let color = document.getElementById("colors");
  return color.value;
}

// au bouton toCartBtn, fonction addCart
toCartBtn.addEventListener("click", () => {
  let qty = qtyValue();
  let color = colorValue();
  add2Cart(id, qty, color);
});
