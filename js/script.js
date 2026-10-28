// Formulario de cotización
const formulario = document.querySelector("#formularioCotizacion");

// Solo ejecutamos este código en la página que tiene el formulario
if (formulario) {
    const mensaje = document.querySelector("#mensajeFormulario");
    const campos = formulario.querySelectorAll("input, select, textarea");

    const claveBorrador = "ecosolarBorrador";

    // Muestra un mensaje dentro de la página
    function mostrarMensaje(texto, tipo) {
        mensaje.textContent = texto;

        mensaje.classList.remove("mensaje-exito", "mensaje-error");
        mensaje.classList.add(tipo);
    }

    // Guarda los valores actuales del formulario
    function guardarBorrador() {
        const datos = {};

        campos.forEach(function (campo) {
            datos[campo.name] = campo.value;
        });

        try {
            localStorage.setItem(claveBorrador, JSON.stringify(datos));
        } catch (error) {
            mostrarMensaje(
                "No se pudo guardar el borrador en este navegador.",
                "mensaje-error"
            );
        }
    }

    // Recupera los datos guardados anteriormente
    function cargarBorrador() {
        try {
            const borrador = localStorage.getItem(claveBorrador);

            if (borrador) {
                const datos = JSON.parse(borrador);

                campos.forEach(function (campo) {
                    if (typeof datos[campo.name] === "string") {
                        campo.value = datos[campo.name];
                    }
                });

                mostrarMensaje(
                    "Se recuperó el borrador guardado en este navegador.",
                    "mensaje-exito"
                );
            }
        } catch (error) {
            mostrarMensaje(
                "No se pudo recuperar el borrador guardado.",
                "mensaje-error"
            );
        }
    }

    // Elimina el borrador guardado
    function eliminarBorrador() {
        try {
            localStorage.removeItem(claveBorrador);
        } catch (error) {
            mostrarMensaje(
                "No se pudo eliminar el borrador del navegador.",
                "mensaje-error"
            );
        }
    }

    // Valida los campos al presionar el botón de revisar
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.querySelector("#nombre");
        const ubicacion = document.querySelector("#ubicacion");
        const telefono = document.querySelector("#telefono");

        if (nombre.value.trim().length < 3) {
            mostrarMensaje(
                "Escribe un nombre de al menos 3 caracteres.",
                "mensaje-error"
            );
            nombre.focus();
            return;
        }

        if (ubicacion.value.trim().length < 3) {
            mostrarMensaje(
                "Escribe una ciudad y estado de al menos 3 caracteres.",
                "mensaje-error"
            );
            ubicacion.focus();
            return;
        }

        if (!/^[0-9]{10}$/.test(telefono.value)) {
            mostrarMensaje(
                "Escribe un teléfono de 10 dígitos, sin espacios.",
                "mensaje-error"
            );
            telefono.focus();
            return;
        }
        if (!formulario.checkValidity()) {
            formulario.reportValidity();

            mostrarMensaje(
                "Revisa los campos señalados antes de continuar.",
                "mensaje-error"
            );
            return;
        }

        eliminarBorrador();

        mostrarMensaje(
            "Los datos son válidos. Esta es una demostración: " +
            "tu solicitud no se ha enviado a ninguna empresa.",
            "mensaje-exito"
        );
    });

    campos.forEach(function (campo) {
        campo.addEventListener("input", guardarBorrador);
        campo.addEventListener("change", guardarBorrador);
    });

    // Borra el borrador al limpiar el formulario
    formulario.addEventListener("reset", function () {
        eliminarBorrador();

        mostrarMensaje(
            "El formulario y el borrador se han limpiado.",
            "mensaje-exito"
        );
    });

    cargarBorrador();
}
document.addEventListener("DOMContentLoaded", function () {
    const botonModo = document.querySelector("#botonModo");
    const cuerpo = document.body;

    if (!botonModo) {
        return;
    }

    // Actualiza el texto del botón
    function actualizarBoton() {
        if (cuerpo.classList.contains("modo-oscuro")) {
            botonModo.textContent = "☀ Modo claro";
            botonModo.setAttribute("aria-pressed", "true");
        } else {
            botonModo.textContent = "🌙 Modo oscuro";
            botonModo.setAttribute("aria-pressed", "false");
        }
    }

    // Recupera el modo guardado
    try {
        if (localStorage.getItem("ecosolarModo") === "oscuro") {
            cuerpo.classList.add("modo-oscuro");
        }
    } catch (error) {
        console.log("No se pudo recuperar el modo guardado.");
    }

    actualizarBoton();

    // Cambia entre modo claro y oscuro
    botonModo.addEventListener("click", function () {
        cuerpo.classList.toggle("modo-oscuro");

        if (cuerpo.classList.contains("modo-oscuro")) {
            try {
                localStorage.setItem("ecosolarModo", "oscuro");
            } catch (error) {
                console.log("No se pudo guardar el modo.");
            }
        } else {
            try {
                localStorage.setItem("ecosolarModo", "claro");
            } catch (error) {
                console.log("No se pudo guardar el modo.");
            }
        }

        actualizarBoton();
    });
});