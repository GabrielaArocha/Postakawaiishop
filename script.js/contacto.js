// Función para manejar el envío del formulario
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevenir el envío por defecto del formulario

        // Obtener los valores del formulario
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const mensaje = document.getElementById("mensaje").value;

        // Validación del formulario
        if (!nombre || !email || !mensaje) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Aquí, el formulario se enviará a través de Formspree
        // Si quieres agregar alguna validación extra antes de enviar, puedes hacerlo aquí

        // Si todo está bien, mostramos un mensaje de éxito
        alert("¡Gracias por contactarnos! Tu mensaje ha sido enviado.");

        // Reseteamos el formulario
        form.reset();
    });
});
