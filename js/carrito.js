const loggedUser = getLoggedUser().email;

const checkout = async () => {
  vaciarCarrito();

  await swal.fire({
    title: 'Gracias por su compra',
    text: 'Pedido en preparación.',
    icon: 'success',
  });

  window.location = 'menu.html';
};

const btnFinalizarCompra = document.getElementById('finalizarCompra');
btnFinalizarCompra.addEventListener('click', checkout);

const updateCartAmount = () => {
  const cart = getCartByUser(loggedUser);

  const total = cart.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

  document.getElementById('totalAPagar').innerHTML = total;

  btnFinalizarCompra.disabled = !total;
};

const loadCart = () => {
  const cart = getCartByUser(loggedUser);

  const carritoContainer = document.querySelector('.carrito-container');

  carritoContainer.innerHTML = '';

  if (cart.length > 0) {
    cart.forEach(({ nombre, precio, cantidad, img, id }) => {
      carritoContainer.innerHTML += `<div class="carrito-con-elemento">
                                      <img src="${img}" alt="" />
                                      <p class="nombre-hamburguesa">Producto: ${nombre}</p>
                                      <p class="precio">Precio: $${precio}</p>
                                      <p id="nroCant-${id}" class="cantidad">Cantidad: ${cantidad}</p>

                                      <div class="adminCant-carrito">
                                          <p data-id-producto="${id}" class="delete">🗑</p>
                                          <p data-id-producto="${id}" class="menosCant">-</p>
                                          <p data-id-producto="${id}" class="masCant">+</p>
                                      </div>
                                  </div>
                                `;
    });

    const botonesMasCant = document.getElementsByClassName('masCant');
    for (const botonMasCant of botonesMasCant) {
      const id = botonMasCant.getAttribute('data-id-producto');
      agregarProductoMasHandler(botonMasCant, id, 'cart');
    }

    const botonesMenosCant = document.getElementsByClassName('menosCant');
    for (const botonMenosCant of botonesMenosCant) {
      const id = botonMenosCant.getAttribute('data-id-producto');
      agregarProductoMenosHandler(botonMenosCant, id, 'cart');
    }

    const botonesDelete = document.getElementsByClassName('delete');
    for (const botonDelete of botonesDelete) {
      const id = botonDelete.getAttribute('data-id-producto');
      agregarProductoDeleteHandler(botonDelete, id);
    }
  } else {
    carritoContainer.innerHTML = '<p>El carrito esta vacio</p>';
  }

  updateCartAmount();
};

loadCart();
