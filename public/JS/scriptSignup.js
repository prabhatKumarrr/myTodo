const signup = document.getElementById("signup-btn");

const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");

signup.onclick = signupFunction;

async function signupFunction() {
  if(firstName.value == "" || lastName.value == "" || email.value == "" || username.value == "" || password.value == "") {
    alert("Provide Input in all fields below!!");
  }
  else {
    const response = await fetch("http://localhost:3000/myTodo/user/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        username: username.value,
        password: password.value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if(response.ok) {
      alert("SignUp Successfull");
      location.href = "http://localhost:3000/myTodo/";
    } 
    else if(response.status == 405) {
      alert("Duplicate Value: Either Username or Email already exists");
    }
    else {
      alert("Invalid Input");
    }
  }
}
