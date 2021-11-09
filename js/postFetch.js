//test
window.onbeforeunload = function dontLeave() {
  alert("Are you sure you want to leave?");
};

// anonymous function with addEventListener that fetches 'postUrl' et posts 'contact' and 'products' to retrieve the confirmation page URL
const postUrl = "http://localhost:3000/api/products/order/";
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => {
  e.preventDefault(); //peut etre supprimer pour enlever l'action par défaut du onclick
  let jsonData = makeJsonData();
  fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((res) => res.json())
    // statut 201 pour vérifier
    // .then((data) => console.log(data))
    .then((data) => {
      console.log(data);
      console.log("ici ohh");
      //   console.log(res.orderId);
      //   // localStorage.clear();
      let url = new URL("id?=" + data.orderId, "./confirmation.html");
      console.log(data.orderId);
      window.location.href = url;
    })
    .catch(() => {
      alert("Une erreur est survenue, merci de revenir plus tard.");
    }); // pour catch les erreurs au cas ou le serv est down par exemple
});
