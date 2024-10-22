// Page Authentication -- Start

const myToken = localStorage.getItem("myTodoToken");

if(!myToken) {
  location.href = "http://localhost:3000/myTodo";
}
else {
  entrySwitch();

  async function entrySwitch() {
    const response = await fetch("http://localhost:3000/myTodo/user/main", {
      method: "POST",
      body: JSON.stringify({
        message: "test body"
      }),
      headers: {
        "Content-Type": "application/json",
        token: myToken,
      }
    });

    if(response.status == 403) {
      alert("Invalid Token!");
      localStorage.removeItem("myTodoToken");
      location.href = "http://localhost:3000/myTodo";
    }
  }
}

//Page Authentication -- End

//myProfile Section -- Start

const dropdown = document.getElementById("dropdown-label");
const dropMenu = document.getElementById("dropdown-menu");
const hamIcon = document.getElementById("ham-icon");

dropdown.onclick = toggleMenu;

function toggleMenu() {
  dropMenu.classList.toggle("menu-open");
  hamIcon.classList.toggle("ham-open");
}

//logout

const logout = document.getElementById("logout");

logout.onclick = logoutFn;

function logoutFn() {
  localStorage.removeItem("myTodoToken");
  location.href = "http://localhost:3000/myTodo";
}

//Reset all 

const reset = document.getElementById("reset-all");

reset.onclick = resetAll;

function resetAll() {
  myTodo = [];
  updateTodo();
  myRenderFn();
}


//myProfile Section -- End

// Load myTodos -- Start

let myTodo = [];

initialLoad();

async function initialLoad() {
  const response = await fetch("http://localhost:3000/myTodo/todoOp/allTodos", {
    headers: {
      token: myToken,
    }
  });

  const data = await response.json();
  myTodo = data.allTodos;

  myRenderFn();
}

async function updateTodo() {
  const response = await fetch("http://localhost:3000/myTodo/todoOp/update", {
    method: "PUT",
    body: JSON.stringify({
      myTodoList: myTodo
    }),
    headers: {
      "Content-Type": "application/json",
      token: myToken
    }
  });

  console.log(await response.json());
}


// Load myTodos -- End


const input = document.getElementById("input");
const btnContainer = document.getElementById("btn-main");
const myTodoList = document.getElementById("myTodo-list");


//Add Todo Button Section -- Start

const addTodo = document.getElementById("add-todo");
const takeInput = document.getElementById("take-input");
const addEdit = document.getElementById("add/edit");

addTodo.onclick = takeInputFn; //Add Todo Onclick response

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
      updateTodo();
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
  
  updateTodo();
  myRenderFn();
}

// Edit Function 

function editFn(index) {
  btnContainer.style.display = "none";
  takeInput.style.display = "flex";
  addEdit.innerHTML = "Edit Todo";
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
    
    updateTodo();
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
  
  updateTodo();
  myRenderFn();
}

//Add Todo button Section -- End



