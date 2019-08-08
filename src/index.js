const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(function(json){
      json.forEach(function (toy) {
        const node = document.createElement("div")
        const html = `<h2>${toy.name}</h2>
        <img src = ${toy.image} class="toy-avatar"/><p>${toy.likes} Likes</p><button class="like-btn" id="${toy.id}">Like <3</button>`
        node.innerHTML = html
        node.setAttribute('class', 'card')
        node.setAttribute('id', `${toy.id}`)
        document.querySelector("#toy-collection").appendChild(node)
      })
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

function postData(data){
  return fetch ("http://localhost:3000/toys", {
    method: 'POST', 
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  })
  .then(response => response.json());
}

toyForm.addEventListener("submit", function(e){
  let data = {name: document.querySelector("input[name=name").value, image: document.querySelector("input[name=image").value, likes: 0 }
  postData(data)
  .then(data => console.log(JSON.stringify(data)))
  .catch(error => console.error(error));
})


function patchData(id, data){
  fetch (`http://localhost:3000/toys/${id}`, {
    method: 'PATCH', 
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json());
  document.getElementById(`${id}`).getElementsByTagName('p')[0].innerText = `${data.likes} Likes`
}

document.addEventListener ("click", function(e) {
  if (e.target.className === "like-btn"){
    const id = e.target.id
    let likes = parseInt(document.getElementById(`${id}`).getElementsByTagName('p')[0].innerText)
    
    likes++
    const data = {likes: likes}
    
    patchData(id, data)
    
    }
  
})

// OR HERE!
