//fonction pour supprimer un item du storage et changer son HTML
for (let i = 0; i < article.length; i++) {
  deleteItem.addEventListener("click", () => {
    let items = getCart();
    let id = article[i].dataset.id;
    let color = article[i].dataset.color;
    for (let j = 0; j < items.length; j++) {
      if (id == items[j][0] && color == items[j][1]) {
        let deletedItem = items.splice(j, 1);
        localStorage.setItem("panier", JSON.stringify(items));
        document.getElementsByClass(
          cart__item[i]
        ).innerHTML = `<p>Kanap supprimé du panier !</p>`;
      }
    }
  });
}
// votre panier est vide / kanap supprimé

const form2 = { hello: city };
fetch("http://localhost:3000/api/products/order", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: form2,
});
