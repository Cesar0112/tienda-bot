// Productos de ejemplo

const productos = [
  { id: 1, nombre: 'Galleta', precio: 1.5, img: 'https://via.placeholder.com/100' },
  { id: 2, nombre: 'Jugo', precio: 2.0, img: 'https://via.placeholder.com/100' }
];

let carrito = [];

function renderProductos() {
  const container = document.getElementById('productos');
  productos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <img src="${p.img}" />
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick="agregar(${p.id})">Agregar</button>
    `;
    container.appendChild(div);
  });
}

function agregar(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  alert(`${producto.nombre} agregado`);
}

function enviarPedido() {
  const data = {
    items: carrito,
    total: carrito.reduce((sum, p) => sum + p.precio, 0)
  };
  Telegram.WebApp.sendData(JSON.stringify(data));
}

renderProductos();