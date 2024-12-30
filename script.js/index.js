// Variable global para almacenar los productos seleccionados
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// URL de la API de productos (esto se debe cambiar según la API que quieras consumir)
const apiUrl = "https://fakestoreapi.com/products";  // Puedes cambiar esta URL a la de tu API

// Función para agregar productos al carrito
const agregarAlCarrito = (nombre, precio) => {
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no, agregarlo al carrito con cantidad 1
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    // Actualizar el carrito en el almacenamiento local
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizar el contador del carrito
    actualizarContador();

    // Mostrar una alerta de confirmación
    alert(`Agregaste: ${nombre} al carrito`);
};

// Función para actualizar el contador del carrito
const actualizarContador = () => {
    const contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.length;
    }
};

// Función para crear y mostrar los productos en la página (productos de la API y estáticos)
const mostrarProductos = (productos) => {
    const contenedorProductos = document.querySelector(".contenedor-productos");

    // Asegúrate de que los productos no se dupliquen al cargar la página
    // Limpiar contenedor antes de agregar nuevos productos
    contenedorProductos.innerHTML = '';

    // Productos estáticos definidos
    const productosEstáticos = [
        {
            nombre: "Cartera Capibara",
            descripcion: "Cartera Monedero Cute Capibara Collection; 6 colores disponibles; 15*5*13cm",
            precio: 18500,
            imagen: "./img/Monedero Capibara.jpeg"
        },
        {
            nombre: "Carteras Hello Kitty and Friends",
            descripcion: "Cartera Monedero Hello Kitty Collection. 7 colores disponibles; 15*5*13cm",
            precio: 15000,
            imagen: "./img/Monederos Hello Kitty.jpeg"
        },
        {
            nombre: "Cartera Sanrio Collection 2024",
            descripcion: "Cartera Redonda Sanrio Collection; 7 colores disponibles; 15*5*13cm",
            precio: 14500,
            imagen: "./img/Cartera Sanrio.jpeg"
        },
        {
            nombre: "Llaveros Souvenir Melody Correa",
            descripcion: "Llaveros Personajes Hello Kitty, My Melody y Otros; Silicona; 50g",
            precio: 3500,
            imagen: "./img/Llaveros.jpeg"
        },
        {
            nombre: "Botella Térmica Farm Animals",
            descripcion: "Botella Térmica 650ml; Acero Inoxidable; Libre BPA / BPA Free",
            precio: 25000,
            imagen: "./img/Botellita.jpeg"
        },
        {
            nombre: "Peluche Capibara Kawaii",
            descripcion: "Peluche de Capybara (Carpincho) Muy Suave y esponjosos; 25cm; 5 modelos",
            precio: 30000,
            imagen: "./img/Peluche Cabibara.jpeg"
        }
    ];

    // Agregar los productos estáticos al contenedor
    productosEstáticos.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("producto");

        divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>$${producto.precio}</p>
            <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Añadir al Carrito</button>
        `;

        contenedorProductos.appendChild(divProducto);
    });

    // Crear los productos obtenidos desde la API y agregarlos al contenedor
    productos.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("producto");

        divProducto.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p>${producto.description}</p>
            <p>$${producto.price}</p>
            <button onclick="agregarAlCarrito('${producto.title}', ${producto.price})">Añadir al Carrito</button>
        `;

        contenedorProductos.appendChild(divProducto);
    });
};

// Función para consumir la API y obtener los productos
const obtenerProductos = async () => {
    try {
        const response = await fetch(apiUrl); // Consumir la API
        const data = await response.json();  // Convertir la respuesta a JSON
        mostrarProductos(data);  // Mostrar los productos en el HTML
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
};

// Función para inicializar el carrito al cargar la página
const inicializarCarrito = () => {
    // Actualizar el contador con el carrito guardado
    actualizarContador();
};

// Inicializar los productos y el carrito cuando se carga la página
window.addEventListener("DOMContentLoaded", () => {
    obtenerProductos();  // Obtener productos desde la API
    inicializarCarrito(); // Inicializar el carrito
});

// Guardar el carrito en el almacenamiento local antes de cerrar la página
window.addEventListener("beforeunload", () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
});
