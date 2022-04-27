const list = document.querySelector("#todo-list");
const form = document.querySelector(".item-form");

function renderTodoListList() {
  list.innerHTML = "";
  // get data
  fetch("http://localhost:3000/todos")
    .then((res) => res.json())
    .then((data) => {
      // update the page
      data.forEach((todo) => {
        const li = document.createElement("li");
        li.innerText = todo.title;
        if (todo.completed) {
          li.className = "completed";
        }
        list.append(li);
      });
    });
}

// create ad event listener for a submit button
form.addEventListener("submit", (event) => {
  // get data from the input field
  event.preventDefault();
  const varTitle = event.target[0].value;
  console.log("Create new Todo:", varTitle);
  const opts = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title: varTitle, completed: false }),
  };

  // make a POST request to the server with the data
  fetch("http://localhost:3000/todos", opts)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderTodoListList();
    });
});

renderTodoListList();
