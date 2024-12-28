// Recuperar el carrito del almacenamiento local
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para mostrar los productos en el carrito
const mostrarCarrito = () => {
    const carritoSection = document.getElementById("carrito");
    const totalCarrito = document.querySelector(".total-carrito p");
    const productosCarrito = document.createElement("div");
    productosCarrito.classList.add("productos-lista");

    // Limpiar la sección de carrito antes de agregar los nuevos productos
    carritoSection.innerHTML = '<h2>Productos en tu Carrito</h2>'; // Restablecer el encabezado

    // Si el carrito está vacío
    if (carrito.length === 0) {
        productosCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        carritoSection.appendChild(productosCarrito);
        actualizarTotal();
        return;
    }

    // Mostrar productos del carrito
    carrito.forEach((producto, indice) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto-carrito");

        productoDiv.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button onclick="eliminarDelCarrito(${indice})">Eliminar</button>
        `;
        productosCarrito.appendChild(productoDiv);
    });

    // Actualizar el total
    actualizarTotal();

    // Añadir la lista de productos al carrito
    carritoSection.appendChild(productosCarrito);
};

// Actualizar el total del carrito
const actualizarTotal = () => {
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const totalCarrito = document.querySelector(".total-carrito p");
    if (totalCarrito) {
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    }
};

// Función para agregar un producto al carrito
const agregarAlCarrito = (nombre, precio) => {
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        // Si el producto ya está, aumentar la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si el producto no está, agregarlo con cantidad 1
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    // Actualizar el carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Mostrar el carrito actualizado
    mostrarCarrito();
};

// Función para eliminar un producto del carrito
const eliminarDelCarrito = (indice) => {
    carrito.splice(indice, 1); // Eliminar el producto en el índice especificado
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar el localStorage
    mostrarCarrito(); // Volver a mostrar el carrito actualizado
};

// Función para proceder al pago
const procederPago = () => {
    alert("Compra realizada con éxito");
    localStorage.removeItem("carrito");
    window.location.href = "index.html"; // Redirigir a la página de inicio
};

// Inicializar el carrito al cargar la página
mostrarCarrito();

