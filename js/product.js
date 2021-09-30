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

// fonction getCart pour aller chercher le cart et le stocker dans let cartItems
function getCart() {
  let itemsCart = [];
  console.log("0 " + itemsCart);
  if (localStorage.getItem("cart") != null) {
    itemsCart = JSON.parse(localStorage.getItem("cart"));
    console.log("1 " + itemsCart);
  }
  return itemsCart;
}

// fonction addCart pour ajouter une valeur au cart en passant par let cartItems
function addCart(idTeddy) {
  let itemsCart = getCart();
  console.log("2 " + itemsCart);
  if (itemsCart.length == 0) {
    itemsCart[idTeddy] = 1;
    console.log("2.5 " + itemsCart);
  } else {
    let blnTrouve = false;
    for (let i = 0; i < itemsCart.length; i++) {
      if (itemsCart.find(idTeddy)) {
        itemsCart[idTeddy]++;
        blnTrouve = true;
      }
    }
    if (blnTrouve == false) {
      itemsCart[idTeddy] = 1;
    }
  }
  localStorage.setItem("cart", JSON.stringify(itemsCart));
  console.log("3 " + itemsCart);
}

// au bouton toCartBtn, fonction addCart
toCartBtn.addEventListener("click", () => {
  addCart(id);
});
