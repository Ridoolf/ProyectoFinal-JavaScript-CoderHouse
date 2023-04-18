function register() {
  let users = localStorage.getItem("users");

  if (users) {
    users = JSON.parse(users);
  } else {
    users = [];
  }

  const newUser = {
    email: document.querySelector(".email-input").value,
    nombre: document.querySelector(".nombre-input").value,
    password: document.querySelector(".password-input").value,
    carrito: [],
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedUser", newUser.email);

  window.location = "index.html";
}

const submitLogin = document.querySelector(".submit-input");

submitLogin.addEventListener("click", register);
