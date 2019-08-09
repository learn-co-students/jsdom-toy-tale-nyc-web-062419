const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;
const toyList = document.getElementById("toy-collection");

// YOUR CODE HERE

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  toggleForm();
});

function toggleForm() {
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
}
// OR HERE!
fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => json.forEach(makeList));

// creates a card for toy
const makeList = function(toy) {
  toyList.insertAdjacentHTML(
    "beforeend",
    `<div class="card" data-id="${toy.id}">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`
  );
};

//grabs form element
toyForm.firstElementChild.addEventListener("submit", function(e) {
  e.preventDefault();
  addNewToy(e.target);
  toggleForm();
});

//Post to database
function addNewToy(form) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: form.name.value,
      image: form.image.value,
      likes: 0
    })
  })
    .then(resp => resp.json())
    .then(json => makeList(json));
  toyForm.firstElementChild.reset();
}

toyList.addEventListener("click", function(e) {
  if (e.target.className === "like-btn") {
    addLike(e.target.parentNode);
  }
});

function addLike(toy) {
  let num = parseInt(toy.querySelector("p").innerText);
  fetch(`http://localhost:3000/toys/${toy.dataset.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ likes: ++num })
  })
    .then(resp => resp.json())
    .then(json => targetUpdate(json));
}

function targetUpdate(toy) {
  let foundToy = toyList.querySelectorAll("div.card");
  console.log(foundToy);
  debugger;
  foundToy.forEach(function(div) {
    if (div.dataset.id == toy.id) {
      div.querySelector("p").innerText = `${toy.likes} Likes`;
    }
  });
}
