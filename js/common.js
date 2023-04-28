const API_KEY = "3d3b9b32aebc72e5e766753be6d6e4d5";

const stockProductos = [
  {
    id: 1,
    nombre: "Cheeseburger",
    desc: "Doble cheddar",
    precio: 2100,
    img: "./img/menu/cheeseburger.png",
  },
  {
    id: 2,
    nombre: "Cheesebacon",
    desc: "Doble cheddar | Doble bacon",
    precio: 2300,
    img: "./img/menu/cheesebacon.png",
  },
  {
    id: 3,
    nombre: "Clasica",
    desc: "Tomate | Lechuga | Salsa especial",
    precio: 1900,
    img: "./img/menu/clasica.png",
  },
  {
    id: 4,
    nombre: "Premium",
    desc: "Cheddar | Bacon | Cebolla caramelizada",
    precio: 2000,
    img: "./img/menu/premium.png",
  },
  {
    id: 5,
    nombre: "Doble",
    desc: "Doble cheddar | Bacon | Huevo",
    precio: 1700,
    img: "./img/menu/cheesebacon.png",
  },
  {
    id: 6,
    nombre: "Criolla",
    desc: "Provoleta | Salsa portuguesa",
    precio: 1750,
    img: "./img/menu/criolla.png",
  },
  {
    id: 7,
    nombre: "Italiana",
    desc: "Queso Emmental | Panceta | Tomate | Rucula | Alioli",
    precio: 1950,
    img: "./img/menu/italiana.png",
  },
  {
    id: 8,
    nombre: "Big Jack",
    desc: "Queso Emmental | Huevo | Lechuga | Aros de cebolla",
    precio: 2200,
    img: "./img/menu/cheeseburger.png",
  },
  {
    id: 9,
    nombre: "Crispy Chicken",
    desc: "Tomate | Lechuga | Pan de papa",
    precio: 1800,
    img: "./img/menu/crispyChicken.png",
  },
  {
    id: 10,
    nombre: "Shackie",
    desc: "Pan de papa | Cheddar | Bacon | Shack sauce",
    precio: 2250,
    img: "./img/menu/wisconsin.png",
  },
  {
    id: 11,
    nombre: "Wisconsin",
    desc: "Cebolla caramelizada | Cheddar | Manteca",
    precio: 1550,
    img: "./img/menu/wisconsin.png",
  },
  {
    id: 12,
    nombre: "Tasty",
    desc: "Pan de papa | Salsa Tasty | Cebolla | Cheddar | Bacon",
    precio: 2550,
    img: "./img/menu/wisconsin.png",
  },
];

const getWeatherData = async (position) => {
  const { latitude, longitude } = position.coords;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`;

  const response = await fetch(url);
  const data = await response.json();

  const weatherIcon = document.getElementById("weatherIcon");

  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
};

const handleGetPositionError = (error) => {
  console.log("Error al obtener la localización del usuario");
};

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

  console.log({ email });

  if (users) {
    cart = JSON.parse(users).find((user) => user.email === email).carrito;
  }

  return cart;
};

const saveCart = (cart, userEmail) => {
  const users = localStorage.getItem("users");

  if (users) {
    const newUsers = [...JSON.parse(users)];

    const userToUpdate = newUsers.find((user) => user.email === userEmail);

    userToUpdate.carrito = cart;

    localStorage.setItem("users", JSON.stringify(newUsers));
  }
};

const logout = () => {
  localStorage.removeItem("loggedUser");
};

const loadHeader = () => {
  let headerHTML = `
                        <div class="nav-bar">
                            <img
                              src="" 
                              id="weatherIcon" 
                              alt="Icono del clima"
                            />
                            <a href="./index.html" class="elemento-nav">Inicio</a>
                            <a href="./menu.html" class="elemento-nav">Menu</a>
                            <img
                              src="./img/logo.png"
                              class="logo-burger"
                              alt="logo de la hamburgueseria"
                            />
                            <a href="./locales.html" class="elemento-nav">Sucursales</a>
                            <a href="./nosotros.html" class="elemento-nav">Nosotros</a>
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

  headerHTML += `<div class="carrito">
                        <a href="carrito.html">
                            <img src="./img/carrito.png" alt="" />
                        </a>
                    </div>`;

  const header = document.getElementsByTagName("header");
  header[0].innerHTML = headerHTML;

  document
    .getElementById(idBtnSession)
    .addEventListener("click", handleBtnSession);
};

const agregarProducto = (id, section) => {
  const item = stockProductos.find((prod) => prod.id === parseInt(id));

  const cart = getCartByUser(loggedUser);

  const findProduct = cart.find((item) => item.id === parseInt(id));

  if (!findProduct) {
    const newCart = [...cart, { ...item, cantidad: 1 }];
    saveCart(newCart, loggedUser);
  } else {
    findProduct.cantidad++;

    saveCart(cart, loggedUser);
  }

  if (section === "cart") {
    actualizarCardCant(id);
  }
};

const restarProducto = (id, section) => {
  let cart = getCartByUser(loggedUser);

  const findProduct = cart.find((item) => item.id === parseInt(id));

  if (findProduct) {
    if (findProduct.cantidad > 1) {
      findProduct.cantidad--;

      saveCart(cart, loggedUser);

      if (section === "cart") {
        actualizarCardCant(id);
      }
    }
  }
};

const eliminarProducto = (id) => {
  const cart = getCartByUser(loggedUser);

  const newCart = cart.filter((item) => item.id !== parseInt(id));

  saveCart(newCart, loggedUser);

  loadCart();
};

const agregarProductoDeleteHandler = (boton, id) => {
  boton.addEventListener("click", () => {
    eliminarProducto(id);
  });
};

const agregarProductoMasHandler = (boton, id, section) => {
  boton.addEventListener("click", () => {
    agregarProducto(id, section);

    if (section === "cart") {
      updateCartAmount();
    }
  });
};

const agregarProductoMenosHandler = (boton, id, section) => {
  boton.addEventListener("click", () => {
    restarProducto(id, section);
    if (section === "cart") {
      updateCartAmount();
    }
  });
};

const getCantProductoCarrito = (idProducto) => {
  let cart = getCartByUser(loggedUser);

  const findProduct = cart.find((item) => item.id === parseInt(idProducto));

  let cant = 0;

  if (findProduct) {
    cant = findProduct.cantidad;
  }

  return cant;
};

const actualizarCardCant = (idProducto) => {
  const cantLabel = document.getElementById(`nroCant-${idProducto}`);

  const cant = `Cantidad: ${getCantProductoCarrito(idProducto)}`;

  cantLabel.innerHTML = cant;
};

const vaciarCarrito = () => {
  saveCart([], loggedUser);
};

navigator.geolocation.getCurrentPosition(
  getWeatherData,
  handleGetPositionError
);
