# myTodoApp
It is a Full Stack Web application built using:
  - Frontend - HTML/CSS/JS/Handlebars
  - Backend -  NodeJs/Express
  - DB - mongoDB
  - some other libraries for validation and authentication like JWT, Zod, Bcrypt,etc


Functionalities: 
  - Signup/Login
  - Add Todo  
  - Edit Todo
  - Delete the Todo
  - Mark as Done/Unmark a Todo
  - Reset all todos

  * I have used token based authentication for login Functionalities also i am storing the hashed password value generated using Bcrypt instead of the plain password into the database for user

Demo: To check run the app in your machine just pull the code :
  - create the .env file and configure it according to example 
  - hit npm install in terminal
  - then npm start
  - the app will be served at port 3000 by default or you can define your own in .env
  - just goto: https://localhost:3000/myTodo on any browser
