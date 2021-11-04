// fonction anonyme par addEventListener qui fetch 'postUrl' et poste 'contact' et 'products'
const postUrl = "http://localhost:3000/api/products/order/";
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", () => {
  let jsonData = makeJsonData();
  fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => response.json())
    .then(function (res) {
      if (res.ok) {
        console.log(res);
        // localStorage.clear();
        // window.location.href = "./confirmation.html";
      } else {
        console.log(erreur);
      }
    });
});
