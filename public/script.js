const addTodo = document.getElementById("add-todo");
const deleteLastTodo = document.getElementById("delete-last-todo");
const input = document.getElementById("input");
const btnContainer = document.getElementById("btn-main");
const takeInput = document.getElementById("take-input");
const addEdit = document.getElementById("add/edit");
const myTodoList = document.getElementById("myTodo-list");

const myTodo = [];

addTodo.onclick = takeInputFn //Add Todo Onclick response
deleteLastTodo.onclick = deleteLastTodoFn;  // Delete Last Todo


// Input Box

function takeInputFn(){
  btnContainer.style.display = "none";
  takeInput.style.display = "flex";

  addEdit.innerHTML = "Add Todo";

  addEdit.onclick = addTodoFn;
}


// Add Todo

function addTodoFn() {
    const value = input.value;
    if(!value){
      alert("No Input Provided.");
    }
    else {
      myTodo.push({
        "id": myTodo.length,
        "todo": value,
        "markDone": false,
      });
      myRenderFn();

      btnContainer.style.display = "flex";
      takeInput.style.display = "none";
      addEdit.innerHTML = "";
      input.value = "";
    }
}


// My Render Function

function myRenderFn() {
  myTodoList.innerHTML = "";

  for(let i=0; i<myTodo.length; i++){
    if(myTodo[i].markDone == true) {
      const newTodo = document.createElement("div");
      newTodo.setAttribute("class", "indent-line");
      newTodo.setAttribute("id", `todo-${i}`);

      newTodo.innerHTML = `
        <div class="same-line">
          <span class="center"><li style="text-decoration: line-through;">${myTodo[i].todo}</li></span>
          <div>
            <button onclick="markingFn(${i})">UnMark</button>
            <button onclick="editFn(${i})">Edit</button>
            <button onclick="deleteThisTodo(${i})">Delete</button>
          </div>
        </div>
      `;

      myTodoList.appendChild(newTodo);
    }
    else {
      const newTodo = document.createElement("div");
      newTodo.setAttribute("class", "indent-line");
      newTodo.setAttribute("id", `todo-${i}`);

      newTodo.innerHTML = `
        <div class="same-line">
          <span class="center"><li>${myTodo[i].todo}</li></span>
          <div>
            <button onclick="markingFn(${i})">Mark Done</button>
            <button onclick="editFn(${i})">Edit</button>
            <button onclick="deleteThisTodo(${i})">Delete</button>
          </div>
        </div>
      `;
      myTodoList.appendChild(newTodo);
    }
  }
}


// Marking Function 

function markingFn(index) {
  if(myTodo[index].markDone == true) {
    myTodo[index].markDone = false;
  }
  else {
    myTodo[index].markDone = true;
  }

  myRenderFn();
}


// Edit Function 

function editFn(index) {
  btnContainer.style.display = "none";
  takeInput.style.display = "flex";
  addEdit.innerHTML = "Edit";
  addEdit.setAttribute("style", "width: 70px;");

  addEdit.onclick = () => {
    editInput(index);
  };
}

// Edit Input function 

function editInput(index) {
  if(!input.value) {
    alert("Invalid Input!");
  }
  else {
    myTodo[index].todo = input.value;
    if(myTodo[index].markDone == true) {
      myTodo[index].markDone = false;
    }

    myRenderFn();

    btnContainer.style.display = "flex";
    takeInput.style.display = "none";
    addEdit.innerHTML = "";
    input.value = "";
  }
}


// Delete Current Todo Function 

function deleteThisTodo(index) {
  myTodo.splice(index, 1);

  myRenderFn();
}


//Delete Last Todo Function 

function deleteLastTodoFn() {
  myTodo.pop();

  myRenderFn();
}
