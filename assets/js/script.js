const URL = "https://api.pexels.com/v1/search?query=";
const URL1 = "https://api.pexels.com/v1/search?query=cat";
const URL2 = "https://api.pexels.com/v1/search?query=mountain";
const auth = "a2uLH6Bzje63OvM0wZRrOTrUZFRTxHfr7WFEwbTU735I5kv2v5q6LnZT";
const loadImagesBtn = document.getElementById("loadImages");
const loadSecondaryImagesBtn = document.getElementById("loadSecondaryImages");
const form = document.getElementById("picsSearchForm");
const imgModal = document.getElementById("imgModal");
const modalBody = document.querySelector(".modal-body");
const dismissBtn = document.getElementById("dismissBtn");

const fetchImages = query => {
  fetch(URL + query, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Couldn't get data");
      }
    })
    .then(requestedPics => {
      const data = requestedPics;
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

        // genero il linkImg per i dettagli
        const cardImgAnchor = document.createElement("a");
        cardImgAnchor.setAttribute("href", `./details.html?picId=${pic.id}`);

        // genero cardImg
        const cardImg = document.createElement("img");
        cardImg.setAttribute("src", `${pic.src.large}`);
        cardImg.style.width = "100%";
        cardImgAnchor.appendChild(cardImg);
        card.appendChild(cardImgAnchor);

        // creo il div .card-body
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // genero il linkTitle per i dettagli
        const cardTitleAnchor = document.createElement("a");
        cardTitleAnchor.setAttribute("href", `./details.html?picId=${pic.id}`);
        cardTitleAnchor.classList.add("link-underline", "link-underline-opacity-0");
        cardTitleAnchor.innerText = `${pic.alt}`;
        card.appendChild(cardTitleAnchor);

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
        viewBtn.classList.add("btn-sm", "btn-outline-success");
        viewBtn.setAttribute("type", "button");
        viewBtn.setAttribute("data-bs-toggle", "modal");
        viewBtn.setAttribute("data-bs-target", "#imgModal");
        viewBtn.innerText = "View";
        viewBtn.onclick = () => {
          modalBody.innerHTML = "";
          const modalImg = document.createElement("img");
          modalImg.setAttribute("src", pic.src.tiny);
          modalBody.appendChild(modalImg);
        };

        const hideBtn = document.createElement("button");
        hideBtn.className = "btn";
        hideBtn.classList.add("btn-sm", "btn-outline-danger");
        hideBtn.setAttribute("type", "button");
        hideBtn.innerText = "Hide";
        hideBtn.addEventListener("click", () => {
          col.remove();
        });

        // creo picId
        const picId = document.createElement("small");
        picId.className = "text-muted";
        picId.innerText = `${pic.id}`;

        card.appendChild(cardBody);
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
};

window.addEventListener("DOMContentLoaded", () => {
  loadImagesBtn.addEventListener("click", () => {
    fetchImages("cat");
  });

  loadSecondaryImagesBtn.addEventListener("click", () => {
    fetchImages("mountain");
  });

  form.onsubmit = event => {
    event.preventDefault();
    const formSearchBar = document.getElementById("picsSearchBar");
    fetchImages(formSearchBar.value);
    form.reset();
  };
});
