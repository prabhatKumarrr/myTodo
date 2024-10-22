const signup = document.getElementById("signup-btn");
const login = document.getElementById("login-btn");

const userInput = document.getElementById("username");
const passInput = document.getElementById("password");

const myToken = localStorage.getItem("myTodoToken");

if(myToken) {
  location.href = "http://localhost:3000/myTodo/main";
}
else {
  signup.onclick = gotoSignupPage;
  login.onclick = loginFunction;

  function gotoSignupPage() {
    location.href = "http://localhost:3000/myTodo/signup";
  }

  async function loginFunction() {
    if(userInput.value == "" || passInput.value == "") {
      alert("No Input for username or Password!!");
    }
    else {
      const user = userInput.value;
      const pass = passInput.value;

      const response = await fetch("http://localhost:3000/myTodo/user/login", {
        method: "POST",
        body: JSON.stringify({
          username: user,
          password: pass
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if(response.ok) {
        localStorage.setItem("myTodoToken", data.token);
        location.href = "http://localhost:3000/myTodo/main";
      }
      else if(response.status == 404) {
        alert("User Doesn't Exist!!");
      }
      else if(response.status == 405) {
        alert("Incorrect Password");
      }
      else {
        alert("Invalid Input!!");
      }
    }
  }
}

