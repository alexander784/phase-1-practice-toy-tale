let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
// Add an event listener to each "Like" button
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {
  button.addEventListener("click", () => {
    // the toy's ID
    const toyId = button.id;

    // Calculate the new number of likes
    const likesElement = button.previousElementSibling;
    const currentLikes = parseInt(likesElement.textContent, 10);
    const newLikes = currentLikes + 1;

    // Submit a PATCH request to update the likes
    fetch(`http://localhost:3000/toys/:id) ${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: newLikes }),
    })
      .then(response => response.json())
      .then(updatedToy => {
        // Update the toy's card in the DOM with the new number of likes
        likesElement.textContent = `${newLikes} Likes`;
      })
      .catch(error => {
        console.error("Error updating likes:", error);
      });
  });
});