const validateEmail = (email) => {
  const emailRegEx = /^[^\s@]+@[^\s@]+\.[^s@]+$/;

  return emailRegEx.test(email);
};

const validateOnlyText = (text) => {
  const textRegEx = /^[a-zA-Z\s]+$/;

  return textRegEx.test(text);
};

const validate = ({ email, nombre, password }) => {
  if (!validateEmail(email)) {
    return false;
  }

  if (
    !validateOnlyText(nombre) ||
    nombre.trim().length < 1 ||
    nombre.trim().length > 10
  ) {
    return false;
  }

  if (password.length < 8 || password.length > 12) {
    return false;
  }

  return true;
};

const register = async () => {
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

  if (validate(newUser)) {
    console.log("Registrar");

    await swal.fire({
      text: "Registrado correctamente",
      icon: "success",
    });

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedUser", newUser.email);

    window.location = "index.html";
  } else {
    swal.fire({ text: "Datos invalidos", icon: "error" });
  }
};

const submitLogin = document.querySelector(".submit-input");

submitLogin.addEventListener("click", register);
