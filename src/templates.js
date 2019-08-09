const toyPostConfig = toyObj => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(toyObj)
});

const toyPatchConfig = toyObj => ({
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(toyObj)
});

const postToy = (toyConfig, container) =>
  fetch("http://localhost:3000/toys", toyConfig)
    .then(resp => resp.json())
    .then(json => (container.innerHTML += toyDiv(json)));

const patchToy = (toyConfig, id) =>
  fetch(`http://localhost:3000/toys/${id}`, toyConfig)
    .then(resp => resp.json())
    .then(json => renderPatch(json));

const renderPatch = json => {
  document.getElementById(json.name).innerText = `${json.likes} Likes`;
  document.querySelector(`button#t${json.id}`).dataset.likes = json.likes;
};

const formToObject = formElements => {
  const [name, image] = formElements
    .filter(el => el.type === "text")
    .map(el => el.value);
  return { name, image, likes: 0 };
};
