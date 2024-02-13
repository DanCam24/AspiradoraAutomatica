document.addEventListener("DOMContentLoaded", function() {
    let cuadroA = document.getElementById("cuadroA");
    let cuadroB = document.getElementById("cuadroB");
    let aspiradora = document.querySelector(".aspiradora");
    let basura = document.querySelector(".basura");
    let contadorElement = document.getElementById("contador");

    let posicionInicial = prompt("Ingrese la posición inicial de la aspiradora (cuadroA o cuadroB):") || "cuadroA";
    let basuraPosicion = prompt("Ingrese la posición de la basura (cuadroA, cuadroB o ambos):") || "cuadroA";
    let basuraPresente = basuraPosicion === posicionInicial || basuraPosicion === "ambos";

    let cuadrosLimpiosContador = 0;

    function limpiarBasura() {
        if (basuraPresente) {
            basuraPresente = false;
            basura.style.display = "none";
            cuadrosLimpiosContador++;
            actualizarContador();
            alert("Basura limpiada");
        } else {
            cuadrosLimpiosContador = 0; // Reinicia el contador si no hay basura
            alert("No hay basura para limpiar");
        }
    }

    function colocarBasura() {
        basuraPresente = true;
        basura.style.display = "block";
        if (basuraPosicion === "cuadroA") {
            cuadroA.appendChild(basura);
        } else if (basuraPosicion === "cuadroB") {
            cuadroB.appendChild(basura);
        } else if (basuraPosicion === "ambos") {
            cuadroA.appendChild(basura.cloneNode(true));
            cuadroB.appendChild(basura.cloneNode(true));
        }
        cuadrosLimpiosContador = 0; // Reinicia el contador si se coloca basura
        actualizarContador();
        alert("Basura colocada en el cuadro especificado");
    }

    function moverAspiradora(destino) {
        if (destino === "cuadroA") {
            cuadroA.appendChild(aspiradora);
        } else if (destino === "cuadroB") {
            cuadroB.appendChild(aspiradora);
        }
        cuadrosLimpiosContador++; // Incrementa el contador cada vez que la aspiradora se mueve
        basuraPresente = basuraPosicion === destino || basuraPosicion === "ambos"; // Actualiza la posición de la basura
        actualizarContador();
        limpiarBasura();
    }


    if (posicionInicial === "cuadroA") {
        cuadroA.appendChild(aspiradora);
    } else if (posicionInicial === "cuadroB") {
        cuadroB.appendChild(aspiradora);
    }

    function actualizarContador() {
        contadorElement.textContent = "Cuadros limpios encontrados: " + cuadrosLimpiosContador;
    }

    document.addEventListener("keydown", function(event) {
        if (event.key === "c") {
            limpiarBasura();
        } else if (event.key === "b") {
            colocarBasura();
        } else if (event.key === "m") {
            let nuevoDestino = (posicionInicial === "cuadroA") ? "cuadroB" : "cuadroA";
            moverAspiradora(nuevoDestino);
            posicionInicial = nuevoDestino;
        }
    });
});
