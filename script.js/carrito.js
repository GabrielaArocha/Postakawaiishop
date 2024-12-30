// Recuperar el carrito del almacenamiento local
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para mostrar los productos en el carrito
const mostrarCarrito = () => {
    const carritoSection = document.getElementById("carrito");
    const productosCarrito = document.createElement("div");
    productosCarrito.classList.add("productos-lista");

    // Limpiar la sección de carrito antes de agregar los nuevos productos
    carritoSection.innerHTML = '<h2>Productos en tu Carrito</h2>'; // Restablecer el encabezado

    // Si el carrito está vacío
    if (carrito.length === 0) {
        productosCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        carritoSection.appendChild(productosCarrito);
        actualizarTotal(); // Aseguramos que el total se muestre como $0.00
        return;
    }

    // Mostrar productos del carrito
    carrito.forEach((producto, indice) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto-carrito");

        productoDiv.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: <input type="number" value="${producto.cantidad}" min="1" onchange="actualizarCantidad(${indice}, this.value)"></p>
            <button onclick="eliminarDelCarrito(${indice})">Eliminar</button>
        `;
        productosCarrito.appendChild(productoDiv);
    });

    // Añadir la lista de productos al carrito
    carritoSection.appendChild(productosCarrito);

    // Actualizar el total
    actualizarTotal();
};

// Función para actualizar la cantidad de un producto
const actualizarCantidad = (indice, cantidad) => {
    carrito[indice].cantidad = parseInt(cantidad, 10);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(); // Volver a mostrar el carrito actualizado
};

// Función para eliminar un producto del carrito
const eliminarDelCarrito = (indice) => {
    carrito.splice(indice, 1); // Eliminar el producto en el índice especificado
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar el localStorage
    mostrarCarrito(); // Volver a mostrar el carrito actualizado
};

// Función para actualizar el total del carrito
const actualizarTotal = () => {
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const totalCarrito = document.querySelector(".total-carrito p");
    if (totalCarrito) {
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    }
};

// Función para proceder al pago
const procederPago = () => {
    alert(`Compra realizada con éxito. Total pagado: $${carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toFixed(2)}`);
    localStorage.removeItem("carrito");
    carrito = []; // Limpiar el carrito en memoria
    mostrarCarrito(); // Asegurar que la interfaz se actualice
};

// Inicializar el carrito al cargar la página
mostrarCarrito();
