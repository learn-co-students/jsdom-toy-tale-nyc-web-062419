const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;

// create form ID added to html and assigned to const
const createForm = document.querySelector("#create-form");
// toy collection ID assigned to const
const toyCollection = document.querySelector("#toy-collection");

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

//fetch request to retrieve json data
fetch("http://localhost:3000/toys")
  //then method that takes a function as its argument, response is argument for function.
  .then(function(response) {
    //return the content that came back in the response
    return response.json();
  })
  // then use the content that came back, pass it as argument of function
  .then(function(toys) {
    // iterate over toys array using forEach method, perform newToy function on each toy that is passed in.
    toys.forEach(toy => {
      newToy(toy);
    });
  });

// function to create a card for a toy
function newToy(toy) {
  // insert.. method called on toyCollection container
  toyCollection.insertAdjacentHTML(
    "beforeend",
    `
  <div class="card" data-id ="${toy.id}"> 
  <h2>${toy.name}</h2>
  <img class="toy-avatar" src="${toy.image}"/>
  <p>${toy.likes} likes</p>
  <button class="like-btn">Like <3</button>
  </div>
  `
  );
}
// add event listener submit for create form
createForm.addEventListener("submit", function(event) {
  // prevent default behavior for event
  event.preventDefault();
  // event target as argument for postToyData
  postToyData(event.target);
});

// function for new toy
function postToyData(form) {
  // fetch request
  fetch("http://localhost:3000/toys", {
    // http method
    method: "POST",
    // housekeeping
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    //housekeeping
    body: JSON.stringify({
      // argument, key, value of user input
      name: form.name.value,
      image: form.image.value,
      likes: 0
    })
  })
    // then method with response as argument for arrow function, with a return of response.json
    .then(response => response.json())
    // json as argument, return json passed into newToy function as argument
    .then(json => newToy(json));
  // reset values of all elememts in form
  form.reset();
}

// event listener added to toyCollection container
toyCollection.addEventListener("click", function(e) {
  // if the target for the event is a class name of like buttton
  if (e.target.className === "like-btn") {
    // perform addLike function on the parent node of the even target
    addLike(e.target.parentNode);
  }
});

//path request
function addLike(toy) {
  // take the number of likes on a toy card and parse it to integer and assign to variable
  let num = parseInt(toy.querySelector("p").innerText);
  // fetch request to toy locate using dataset id, patch method
  fetch(`http://localhost:3000/toys/${toy.dataset.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      // increase likes by 1
      likes: (num += 1)
    })
  })
    .then(resp => resp.json())
    // call targetUpdate function on json data
    .then(json => targetUpdate(json));
}
//locate card to update
function targetUpdate(toy) {
  // find div with class of card and assign to foundToy variable
  let foundToy = toyCollection.querySelectorAll("div.card");
  console.log(foundToy);
  foundToy.forEach(function(div) {
    // if the dataset id matches the current toy id, then update the likes to x amount of likes
    if (div.dataset.id == toy.id) {
      div.querySelector("p").innerText = `${toy.likes} Likes`;
    }
  });
}
