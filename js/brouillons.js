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
////makejsondata
if (products.find(items[i][0])) {
  products.pop();
}
// onchange validation sur le bouton
// res.json orderId

// supprimer les doublons dus au couleurs dans le tableau products
// il y a des erreurs console (sans degats possibles) sur les autres pages que cart.html

Il faut verifier les regex ;
il faut verifier qu'on ne puisse pas ajouter n'importe quellle requete au backend
never trust user input

