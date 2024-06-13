const URL = "https://api.pexels.com/v1/search?query=cat";
const auth = "a2uLH6Bzje63OvM0wZRrOTrUZFRTxHfr7WFEwbTU735I5kv2v5q6LnZT";

window.addEventListener("DOMContentLoaded", function () {
  fetch(URL, {
    headers: {
      Authorization: "a2uLH6Bzje63OvM0wZRrOTrUZFRTxHfr7WFEwbTU735I5kv2v5q6LnZT"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Couldn't get data");
      }
    })
    .then(catPics => {
      console.log(catPics);
    })
    .catch(err => console.log(err));
});
