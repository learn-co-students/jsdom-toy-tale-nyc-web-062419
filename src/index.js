const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyFormActual = document.querySelector("form.add-toy-form")
const toyDisplay = document.querySelector('#toy-collection')






let addToy = false

// YOUR CODE HERE

function renderCard(toy) {
  const toyCard = document.createElement('div')

  toyCard.classList.add('card')
  toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src= ${toy.image} class="toy-avatar">
    <p data-id=${toy.id}>${toy.likes}</p>
    <button class="like-btn" data-id=${toy.id}>Like <3</button>
  `
  toyDisplay.append(toyCard)
  
}


fetch("http://localhost:3000/toys")
.then( response => response.json())
.then( data => {
  data.forEach ( toy => renderCard(toy))
})



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
}) 


toyFormActual.addEventListener('submit', (event)=>{


  event.preventDefault()

  const submit_object = {
    "name": event.path[0][0].value,
    "image": event.path[0][1].value,
    "likes": 0
  }

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"},
    body: JSON.stringify(submit_object)
  }
  

  fetch("http://localhost:3000/toys", config)
  .then( response => response.json())
  .then( toy => renderCard(toy))

})


toyDisplay.addEventListener("click", (event) => {
  if (event.target.classList.value === "like-btn") {

    const toyId = event.target.dataset.id

    const currentLikes = parseInt(document.querySelector(`p[data-id='${toyId}']`).textContent)


    const submit_object = {
      "likes": 1 + currentLikes
    }

    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"},
      body: JSON.stringify(submit_object)
    }
    
    fetch(`http://localhost:3000/toys/${toyId}`, config)
    .then( response => response.json())
    .then( toy => {
      document.querySelector(`p[data-id='${toyId}']`).textContent = toy.likes
    })



  }

})




// OR HERE!
