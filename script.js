const productos = [
  {
    id: 1,
    nombre: "Sony Control Dualsense PS5",
    descripcion: "Un control ergonomico para tus necesidades.",
    precio: 25000,
    imagen: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS-h-bUHTiC6SB-92u8zT58TYYY4C17oLTT71HhQYOYYZaHeoDMQlof2lfrlgGZkdOTyd22f6caTjnNrmo7Tg4hfW-zIc86FTTz-oZaNq6i27uJ9KvhnNsNgZI"
  },
  {
    id: 2,
    nombre: "Mouse Ergonomico Vertical Inalambrico",
    descripcion: "Disfruta de tu mouse evitando dolores",
    precio: 18000,
    imagen: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSJevP5hrklzNpxAxggnRyaZGCuRHHSfoHKzWYQh765-9CHmBOefL-JuXgbbSXF8_ofI_sdjfHm9If70KA5-15Wa2BT3Q1KZiAiS55Wiy7dXs73wwjRi0Is"
  },
  {
    id: 3,
    nombre: "Audiculares gamer",
    descripcion: "Disfruta de experiencias sensoriales como ninguna otra",
    precio: 30000,
    imagen: "https://i.blogs.es/25be06/auricularesjugonesap/1366_2000.jpg"
  },
  {
    id: 4,
    nombre: "Teclado gamer",
    descripcion: "Siente la Exoeriencia completa del gamer",
    precio: 18000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR62XwYWHi9UkLhQXg4wMqrJEzF0_yBA-XDf7Q9b_pLija_WBIsoImr-lM&s=10"
  },
  {
    id: 5,
    nombre: "Mochila Gamer",
    descripcion: "Para traer todo contigo, todo el tiempo",
    precio: 22000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQENpGOIMbfrBNHX5qksFZOCUxw09KaHgf6QikVxcGFd6_FvFh8NVpS3-M&s=10"
  }
];


/* ==============================
   CARRITO
================================ */

const carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");


/* ==============================
   MOSTRAR PRODUCTOS
================================ */

function mostrarProductos() {

  contenedorProductos.innerHTML = "";

  productos.forEach(prod => {

    const div = document.createElement("div");

    div.className = "producto";

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">

      <h3>${prod.nombre}</h3>

      <p class="descripcion">
        ${prod.descripcion}
      </p>

      <p class="precio">
        ${prod.precio.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0
        })}
      </p>

      <button onclick="agregarAlCarrito(${prod.id})">
        Agregar al carrito
      </button>
    `;

    contenedorProductos.appendChild(div);

  });

}


/* ==============================
   AGREGAR AL CARRITO
================================ */

function agregarAlCarrito(id) {

  const productoExistente =
    carrito.find(p => p.id === id);

  if (productoExistente) {

    productoExistente.cantidad++;

  } else {

    const producto =
      productos.find(p => p.id === id);

    carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  actualizarCarrito();

}


/* ==============================
   ACTUALIZAR CARRITO
================================ */

function actualizarCarrito() {

  listaCarrito.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  carrito.forEach(item => {

    const li =
      document.createElement("li");

    const subtotal =
      item.precio * item.cantidad;

    li.textContent =
      `${item.nombre} x${item.cantidad} — ` +
      subtotal.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
      });

    listaCarrito.appendChild(li);

    total += subtotal;
    totalItems += item.cantidad;

  });

  totalCarrito.textContent =
    total.toLocaleString("es-CO");

  actualizarTituloCarrito(totalItems);

}


/* ==============================
   CONTADOR DEL CARRITO
================================ */

function actualizarTituloCarrito(cantidad) {

  const titulo =
    document.querySelector(".carrito h2");

  titulo.textContent =
    `🧾 Carrito de Compras (${cantidad})`;

}


/* ==============================
   VACIAR CARRITO
================================ */

function vaciarCarrito() {

  if (carrito.length === 0) {

    alert("🛒 El carrito ya está vacío.");

    return;

  }

  if (
    confirm(
      "¿Estás seguro de que quieres vaciar el carrito?"
    )
  ) {

    carrito.length = 0;

    actualizarCarrito();

  }

}


/* ==============================
   FINALIZAR COMPRA
================================ */

function finalizarCompra() {

  if (carrito.length === 0) {

    alert(
      "🛒 Tu carrito está vacío. Agrega productos antes de finalizar la compra."
    );

    return;

  }

  alert(
    "🎉 ¡Pedido simulado confirmado!\n\n" +
    "En un eCommerce real, ahora entrarían en acción " +
    "el backend, la pasarela de pago y la logística."
  );

  carrito.length = 0;

  actualizarCarrito();

}


/* ==============================
   INICIAR TIENDA
================================ */

mostrarProductos();
