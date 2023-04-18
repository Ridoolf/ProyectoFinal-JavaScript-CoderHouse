const loggedUser = "bill@gates.com";

const stockProductos = [
  {
    id: 1,
    nombre: "Cheeseburger",
    desc: "Doble cheddar",
    precio: 2100,
    img: "./img/menu/cheeseburger.png",
    cantidad: 1,
  },
  {
    id: 2,
    nombre: "Cheesebacon",
    desc: "Doble cheddar | Doble bacon",
    precio: 2300,
    img: "./img/menu/cheesebacon.png",
    cantidad: 1,
  },
  {
    id: 3,
    nombre: "Clasica",
    desc: "Tomate | Lechuga | Salsa especial",
    precio: 1900,
    img: "./img/menu/clasica.png",
    cantidad: 1,
  },
  {
    id: 4,
    nombre: "Premium",
    desc: "Cheddar | Bacon | Cebolla caramelizada",
    precio: 2000,
    img: "./img/menu/premium.png",
    cantidad: 1,
  },
  {
    id: 5,
    nombre: "Doble",
    desc: "Doble cheddar | Bacon | Huevo",
    precio: 1700,
    img: "./img/menu/doble.png",
    cantidad: 1,
  },
  {
    id: 6,
    nombre: "Criolla",
    desc: "Provoleta | Salsa portuguesa",
    precio: 1750,
    img: "./img/menu/criolla.png",
    cantidad: 1,
  },
  {
    id: 7,
    nombre: "Italiana",
    desc: "Queso Emmental | Panceta | Tomate | Rucula | Alioli",
    precio: 1950,
    img: "./img/menu/italiana.png",
    cantidad: 1,
  },
  {
    id: 8,
    nombre: "Big Jack",
    desc: "Queso Emmental | Huevo | Lechuga | Aros de cebolla",
    precio: 2200,
    img: "./img/menu/bigJack.png",
    cantidad: 1,
  },
  {
    id: 9,
    nombre: "Crispy Chicken",
    desc: "Tomate | Lechuga | Pan de papa",
    precio: 1800,
    img: "./img/menu/crispyChicken.png",
    cantidad: 1,
  },
  {
    id: 10,
    nombre: "Shackie",
    desc: "Pan de papa | Cheddar | Bacon | Shack sauce",
    precio: 2250,
    img: "./img/menu/wisconsin.png",
    cantidad: 1,
  },
  {
    id: 11,
    nombre: "Wisconsin",
    desc: "Cebolla caramelizada | Cheddar | Manteca",
    precio: 1550,
    img: "./img/menu/wisconsin.png",
    cantidad: 1,
  },
  {
    id: 12,
    nombre: "Tasty",
    desc: "Pan de papa | Salsa Tasty | Cebolla | Cheddar | Bacon",
    precio: 2550,
    img: "./img/menu/wisconsin.png",
    cantidad: 1,
  },
];

const carrito = [];

const cantProductosNumero = document.querySelector("header");

const menuContainer = document.querySelector("#menu-container");

stockProductos.forEach((prod) => {
  const { id, nombre, desc, precio, img } = prod;
  menuContainer.innerHTML += `
    <div class="card">
        <img class="img-prod" src="${img}" alt="card imagen">
        <div class="card-body">
            <p class="nombre-producto">${nombre}</p>
            <p class="desc-producto">${desc}</p>
            <p class="precio-producto">$${precio}</p>
            <button data-id-producto="${id}" class="btn btn-agregar-carrito">Agregar al Carrito</button>
        </div>
    </div>
    `;

  const botonesAgregarCarrito = document.getElementsByClassName(
    "btn-agregar-carrito"
  );

  for (const botonAgregarCarrito of botonesAgregarCarrito) {
    botonAgregarCarrito.addEventListener("click", (event) => {
      const id = parseInt(event.target.getAttribute("data-id-producto"));

      agregarProducto(id);
    });
  }
});

function agregarProducto(id) {
  const item = stockProductos.find((prod) => prod.id === id);
  carrito.push(item);

  localStorage.getItem("carrito");

  console.log(carrito);
}

loadHeader();
