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
        // so if the todo is completed but is classed as completed, there should be a button that can modify its status
        // if()
        // const li = document.createElement('li')
        // li.innerText = todo.completed
        // ul.append(li)

        const completeButton = document.createElement("input");
        completeButton.setAttribute("type", "button");
        completeButton.setAttribute("value", "✅");
        li.append(completeButton);

        const deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("value", "❌");
        li.append(deleteButton);

        completeButton.addEventListener("click", (completedEvent) => {
          completedEvent.preventDefault();
          function updateStatus() {
            console.log("here");
            // not sure what to do the url
            fetch(`http://localhost:3000/todos/${todo.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ completed: true }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                // get the current list item (li)
                // set the attribute of the css class completed
                if (todo.completed) {
                    li.className = "complete";
                }
              });
          }
          updateStatus();
        });

        deleteButton.addEventListener("click", (deleteEvent) => {
        //   deleteEvent.preventDefault();

          function deleteTodo() {
            if (todo.completed) {
              //   delete by targeting the id
              fetch(`http://localhost:3000/todos/${todo.id}`, {
                method: "DELETE",
              });
              list.remove()
            }
          }
          deleteTodo();
        });
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
    .then(() => {
      renderTodoListList();
    });
});

renderTodoListList();
