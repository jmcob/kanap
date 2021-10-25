// const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
// function ValidateEmail(mail) {
//   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value)) {
//     return true;
//   }
//   firstNameErrorMsg.innerHTML = `Entrez une adresse email valide s'il vous plait`;
//   return false;
// }
// total price (if qty)
// let price = 0;
// price += data[j].price * items[i][2];
// document.getElementById("totalPrice").innerHTML = price;
// total Quantity
// let qty = 0;
// qty += items[i][2];
// document.getElementById("totalQuantity").innerHTML = qty;

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
// votre panier est vide
// DeleteItem; ok
// item quantity change;
// Form : prenom, nom, adresse, ville, mail, submit
// onchange qty(id, color, this.value)
