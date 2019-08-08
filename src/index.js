const addBtn = document.querySelector("#new-toy-btn")
const toyForm = document.querySelector(".container")
const form = document.querySelector("form")
let addToy = false

form.addEventListener("submit", function(e) {
  e.preventDefault()
  postToy(e.target)
})

// YOUR CODE HERE
fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => showToys(json))

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = "block"
  } else {
    toyForm.style.display = "none"
  }
})

// OR HERE!
function showToys(json) {
  json.forEach(toy => {
    makeToyCard(toy)
  })
}

function postToy(form) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json"
    },
    body: JSON.stringify({
      name: form.name.value,
      image: form.image.value,
      likes: 0
    })
  })
    .then(response => response.json())
    .then(newToy => {
      makeToyCard(newToy)
    })
}

function postLike(toyId, toyLikes) {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json"
    },
    body: JSON.stringify({
      likes: toyLikes
    })
  })
    .then(response => response.json())
    .then(newToy => {
      // prettier-ignore
      document.getElementById(newToy.id).childNodes[4].innerText = `${newToy.likes} Likes`
    })
}

function makeToyCard(toy) {
  const toyDiv = document.createElement("div")
  const toyCollection = document.querySelector("#toy-collection")
  toyDiv.className = "card"
  toyDiv.id = toy.id
  // give each toy its attribbutes
  toyDiv.innerHTML = `<h2>${toy.name}</h2>
  <img src='${toy.image}' class="toy-avatar" />
  <p>${toy.likes} Likes </p>`
  let button = document.createElement("button")
  button.innerText = "Like <3"
  button.addEventListener("click", function(e) {
    likePressed(e)
  })
  toyDiv.append(button)
  toyCollection.append(toyDiv)
}

function likePressed(e) {
  // make a patch request to increment the likes
  let toyId = parseInt(e.target.parentNode.id)
  let likeCount = parseInt(e.target.parentElement.childNodes[4].innerText[0])
  likeCount++

  postLike(toyId, likeCount)
}
