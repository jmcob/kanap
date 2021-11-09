//test
window.onbeforeunload = function dontLeave() {
  alert("Are you sure you want to leave?");
};

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
      console.log(data.orderId);
      console.log("ici ohh");
      // localStorage.clear();
      // const confirmationUrl = new URL(
      //   data.orderId,
      //   "http://127.0.0.1:5501/html/confirmation.html?id="
      // );
      // const youpi = new URL("confirmation.html?id=" + data.orderId, "./");
      let url = "./confirmation.html?id=" + data.orderId;
      console.log(url);
      // console.log(confirmationUrl);
      // console.log(youpi);
      window.location.href = url;
    })
    .catch(() => {
      alert("Une erreur est survenue, merci de revenir plus tard.");
    }); // catching errors
});
