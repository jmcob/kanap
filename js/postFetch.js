// anonymous function with addEventListener that fetches 'postUrl' et posts 'contact' and 'products' to retrieve the confirmation page URL
const postUrl = "http://localhost:3000/api/products/order/";
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => {
  e.preventDefault(); //prevent default form button action
  let jsonData = makeJsonData();
  fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((res) => res.json())
    // to check res.ok status in the network
    .then((data) => {
      localStorage.clear();
      let confirmationUrl = "./confirmation.html?id=" + data.orderId;
      window.location.href = confirmationUrl;
    })
    .catch(() => {
      alert("Une erreur est survenue, merci de revenir plus tard.");
    }); // catching errors
});
