const URL = "https://api.pexels.com/v1/search?query=cat";
const auth = "a2uLH6Bzje63OvM0wZRrOTrUZFRTxHfr7WFEwbTU735I5kv2v5q6LnZT";
const loadImagesBtn = document.getElementById("loadImages");

loadImagesBtn.addEventListener("click", function () {
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
      const data = catPics;
      console.log(catPics);
      console.log(catPics.photos);
      console.log("data", data.photos);
      const row = document.getElementById("cardsContainer");
      row.innerHTML = "";
      data.photos.forEach(pic => {
        //creo i div .col
        const col = document.createElement("div");
        col.className = "col-md-4";

        // creo i div .card
        const card = document.createElement("div");
        card.className = "card";
        card.classList.add("mb-4", "shadow-sm");
        col.appendChild(card);

        // genero cardImg
        const cardImg = document.createElement("img");
        cardImg.setAttribute("src", `${pic.src.large}`);
        card.appendChild(cardImg);

        // creo il div .card-body
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // creo h5
        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerText = `${pic.alt}`;

        // creo il div .card-text
        const cardText = document.createElement("div");
        cardText.className = "card-text";

        // creo il cardFooter
        const cardFooter = document.createElement("div");
        cardFooter.className = "d-flex";
        cardFooter.classList.add("justify-content-between", "align-items-center");

        // creo il button group
        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";

        // creo i due bottoni
        const viewBtn = document.createElement("button");
        viewBtn.className = "btn";
        viewBtn.classList.add("btn-sm", "btn-outline-secondary");
        viewBtn.setAttribute("type", "button");
        viewBtn.innerText = "View";

        const hideBtn = document.createElement("button");
        hideBtn.className = "btn";
        hideBtn.classList.add("btn-sm", "btn-outline-secondary");
        hideBtn.setAttribute("type", "button");
        hideBtn.innerText = "Hide";

        // creo picId
        const picId = document.createElement("small");
        picId.className = "text-muted";
        picId.innerText = `${pic.id}`;

        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardFooter);
        cardFooter.appendChild(btnGroup);
        btnGroup.appendChild(viewBtn);
        btnGroup.appendChild(hideBtn);
        cardFooter.appendChild(picId);
        row.appendChild(col);
      });
    })
    .catch(err => console.log(err));
});

window.addEventListener("DOMContentLoaded", function () {});
