document.addEventListener("DOMContentLoaded", (e)=>{

const toyCollection = document.getElementById("toy-collection")
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector('.add-toy-form')
let addToy = false
const toyUrl = "http://localhost:3000/toys"

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

fetch(toyUrl)
.then(response => response.json())
.then(data => {
  getToys(data)
})

function getToys(data){
  data.forEach(toy => {
    getToy(toy)
  })
}

function getToy(toy){
  toyCollection.insertAdjacentHTML("beforeend", `
      <div class="card" data-id="${toy.id}">
        <h2 data-id="${toy.id}">${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p data-id="${toy.id}">${toy.likes}</p>
        <button class="like-btn" data-id="${toy.id}">Like <3</button>
        <form class="change-toy-name-form" style="" data-id="${toy.id}">
        <input id="name_input" type="text" name="content" placeholder="${toy.name}">
        <input type="submit" value="Submit"/>
        </form>
        <button class="delete-btn" data-id="${toy.id}">Delete this Toy</3</button>
        </div>
  `)
}

toyCollection.addEventListener("click", (e)=> {
    console.log(e.target)
    let toyId = e.target.dataset.id
    if (e.target.className === "like-btn"){
      let likeCounter = document.querySelector(`p[data-id="${toyId}"]`)
      likeCounter.innerText++
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: likeCounter.innerText
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
    } else if (e.target.className === "delete-btn"){
      e.target.parentNode.remove()
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "DELETE"
      })
    } 
})




addToyForm.addEventListener("submit", (e)=> {
  e.preventDefault()
  console.log(e.target)
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    })
  })
  .then(response => response.json())  
  .then(toy => {
      getToy(toy)
  })
  e.target.name.value = ""
  e.target.image.value = ""
})

toyCollection.addEventListener("submit", (e)=> {
  e.preventDefault()
  let toyId = e.target.dataset.id
  if (e.target.className === "change-toy-name-form") {
    console.log(e.target.content.value)
    let oldName = document.querySelector(`h2[data-id="${toyId}"]`)
    oldName.innerText = e.target.content.value

    fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: oldName.innerText
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  }
  e.target.content.placeholder = e.target.content.value
  e.target.content.value = ""
})


})