const getUserByEmail = (email) => {
  const users = localStorage.getItem("users");

  let user = null;

  if (users) {
    user = JSON.parse(users).find((user) => user.email === email);
  }

  return user;
};

const getLoggedUser = () => {
  const loggedUser = localStorage.getItem("loggedUser");

  let user = null;

  if (loggedUser) {
    user = getUserByEmail(loggedUser);
  }

  return user;
};

const getCartByUser = (email) => {
  const users = localStorage.getItem("users");

  let cart = null;

  if (users) {
    cart = JSON.parse(users).find((user) => user.email === email).carrito;
  }

  return cart;
};

const logout = () => {
  localStorage.removeItem("loggedUser");
};

const loadHeader = () => {
  let headerHTML = `
                        <div class="nav-bar">
                            <a href="./index.html">Inicio</a>
                            <a href="./menu.html">Menu</a>
                            <img
                            src="./img/logo.png"
                            class="logo-burger"
                            alt="logo de la hamburgueseria"
                            />
                            <a href="./locales.html">Local</a>
                            <a href="./nosotros.html">Info</a>
                     `;

  const loggedUser = getLoggedUser();
  let handleBtnSession = null;
  let idBtnSession = "";
  let cart = [];

  if (loggedUser) {
    headerHTML += `<div class="info-loggedUser">
                        <p id="usuario-logeado">Hola: <span>${loggedUser.nombre}</span></p>
                        <button id="btn-logout">Cerrar sesion</button>
                    </div`;

    handleBtnSession = () => {
      logout();
      window.location = "index.html";
    };

    idBtnSession = "btn-logout";

    cart = getCartByUser(loggedUser.email);
  } else {
    headerHTML += `<button id="btn-login">Iniciar sesion</button>`;

    handleBtnSession = () => {
      window.location = "login.html";
    };

    idBtnSession = "btn-login";
  }

  headerHTML += `</div>`;

  if (cart.length > 0) {
    headerHTML += `<div class="carrito">
                        <a href="carrito.html">
                            <img src="./img/carrito.png" alt="" />
                        </a>
                    </div>`;
  }

  const header = document.getElementsByTagName("header");
  header[0].innerHTML = headerHTML;

  document
    .getElementById(idBtnSession)
    .addEventListener("click", handleBtnSession);
};
