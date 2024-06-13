const URL = "https://api.pexels.com/v1/photos/";
const auth = "a2uLH6Bzje63OvM0wZRrOTrUZFRTxHfr7WFEwbTU735I5kv2v5q6LnZT";
const params = new URLSearchParams(window.location.search);
const id = params.get("picId");
const container = document.querySelector(".container");
const body = document.querySelector("body");

console.log(id);

window.addEventListener("DOMContentLoaded", function () {
  fetch(URL + id, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        throw new Error("Couldn't get data");
      }
    })
    .then(picObj => {
      console.log(picObj);
      body.style.backgroundColor = `${picObj.avg_color}`;

      // creo l'immagine
      const detailsImg = document.createElement("img");
      detailsImg.setAttribute("src", `${picObj.src.landscape}`);
      detailsImg.style.width = "100%";
      container.appendChild(detailsImg);

      // creo il nome dell'artista
      const artist = document.createElement("h2");
      artist.innerText = `${picObj.photographer}`;
      container.appendChild(artist);
    });
});
