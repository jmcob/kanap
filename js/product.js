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
// Fetching data from backend & constructing DOM
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

////////
//Getting HTML values from HTML
/////////
// La fonction qui recupere la valeur du champs quantity dans le markup
function qtyValue() {
  let qty = document.getElementById("quantity");
  return qty.value;
}

// La fonction qui recupere la valeur de la couleur du kanap dans le markup
function colorValue() {
  let color = document.getElementById("colors");
  return color.value;
}

// HTML element : button add to cart
const toCartBtn = document.getElementById("addToCart");
// au bouton toCartBtn, fonction addCart qui active les autres fonction au click
toCartBtn.addEventListener("click", () => {
  let qty = parseInt(qtyValue());
  let color = colorValue();
  add2Cart(id, color, qty);
});
