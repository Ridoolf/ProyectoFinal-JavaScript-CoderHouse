const loggedUser = getLoggedUser().email;

const cantProductosNumero = document.querySelector("header");

const menuContainer = document.querySelector("#menu-container");

stockProductos.forEach((prod) => {
  const { id, nombre, desc, precio, img } = prod;

  const cantProductoCarrito = getCantProductoCarrito(id);

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
    const id = botonAgregarCarrito.getAttribute("data-id-producto");

    agregarProductoMasHandler(botonAgregarCarrito, id, "menu");
  }
});

loadHeader();
