
const toyCollection = document.querySelector('#toy-collection')
let addToy = false

function fetchToys(){
  // GET toy objects from JSON
  return fetch("http://localhost:3000/toys/")
  .then(resp => resp.json())
}

// // POSSIBLE REWRITE
// function renderToys(toy) 
// { //creates toy cards from JSON data
// let divCard = document.createElement('div')
// divCard.setAttribute('class', 'card')
//   }


//  OLD VERSION
  function renderToys(toy) 
  { //creates toy cards from JSON data
    toyCollection.insertAdjacentHTML("beforeend",`
    <div class="card"> <h2>${toy.name}</h2>
    <img class="toy-avatar" src= ${toy.image}></img>
    <p>${toy.likes} Likes</p> <button class="like-btn">Like <3</button>
    <p>TOY ID: ${toy.id}</p>
    </div>`)
    likeButton = document.getElementsByClassName("like-btn")[toy.id - 1]

    likeButton.addEventListener('click', e => {
      // adds to # of likes for toy when like button is clicked
      // event.preventDefault(e)  
      likeToy(toy,e)
      // debugger
      console.log(`toy id: ${toy.id}`)
      console.log(`toy likes: ${toy.likes}`)
    })
  }





function postToy(toy_data) 
{ // POST new toy object to JSON
  return fetch( 'http://localhost:3000/toys/', 
  {
    method: "POST",
    headers:{ "Content-Type": "application/json",
              "Accept": "application/json" },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0 })
  })
  .then(res => res.json())
  .then(function(obj_toy) {
    console.log("Data Posted")  
    renderToys(obj_toy)
  })
  .catch(function(error) {
    document.body.innerHTML = error.message
  })
}

function likeToy(toy,e) {
  e.preventDefault()
  return fetch(`http://localhost:3000/toys/${toy.id}`,  {
    method: "PATCH", 
    headers:{ "Content-Type": "application/json",
              "Accept": "application/json" },
    body: JSON.stringify( {
    "likes": toy.likes += 1
    })
  })
  .then(res => res.json()) 
  .then((like_obj => {
    e.target.previousElementSibling.innerText = `${toy.likes} likes`
  // .then(likeToy (likeButton.previousElementSibling.innerHTML = `${toy.likes} Likes`)
  }))
}

//Event Listeners
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  return (addToy) ?
  (toyForm.style.display = 'block') : 
  (toyForm.style.display = 'none')
})

toyForm.addEventListener('submit', event => {
  // send form data to POST
  event.preventDefault()
  postToy(event.target)
  console.log("Form Data Sent to POST")
})



// main script execution
document.addEventListener('DOMContentLoaded', function() {
  fetchToys().then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
    })
  })
})
