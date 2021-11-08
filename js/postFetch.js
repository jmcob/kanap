//test
window.onbeforeunload = function dontLeave() {
  return "Are you sure you want to leave?";
};

// anonymous function with addEventListener that fetches 'postUrl' et posts 'contact' and 'products'
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
    // .then((res) => res.json())

    .then(function (res) {
      if (res.ok) {
        console.log(response.orderId);
        // localStorage.clear();
        // window.location.href = "./confirmation.html";
      } else {
        console.log("erreur");
      }
    });
});
// let response = await fetch(postUrl, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: jsonData,
// });

// let result = await response.json();
// alert(result.message);
