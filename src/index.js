const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const submitFields = document.querySelector("form.add-toy-form");
let addToy = false;

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

// OR HERE!
window.addEventListener("DOMContentLoaded", e => {
  // fetch/render toys
  const toyDiv = toyObj => `<div className="card">
  <h2>${toyObj.name}</h2>
  <img src="${toyObj.image}" alt="${toyObj.name}"/>
  <p id="${toyObj.name}">${toyObj.likes} Likes</p>
  <button data-likes="${toyObj.likes}" data-id="${toyObj.id}" id="t${
    toyObj.id
  }" class="like-btn">Like This!</button>
</div>`;

  const toyChest = document.getElementById("toy-collection");

  toyForm.addEventListener("submit", e => {
    e.preventDefault();
    const toyObj = formToObject([...submitFields.elements]);
    const currentPost = toyPostConfig(toyObj);
    postToy(currentPost, toyChest);
    submitFields.reset();
  });

  toyChest.addEventListener("click", e => {
    if (e.target.className === "like-btn") {
      const toyId = parseInt(e.target.dataset.id);
      const toyObj = { likes: parseInt(e.target.dataset.likes) + 1 };
      const toyConfig = toyPatchConfig(toyObj);

      patchToy(toyConfig, toyId);
    }
    //if(e.target.c
  });

  const getToys = () =>
    fetch("http://localhost:3000/toys")
      .then(resp => resp.json())
      .then(json => renderToys(json));

  const renderToys = toys =>
    toys.forEach(toy => {
      const newDiv = toyDiv(toy);
      document.getElementById("toy-collection").innerHTML += newDiv;
    });

  getToys();
});
