document.addEventListener("DOMContentLoaded", function() {
    let cuadroA = document.getElementById("cuadroA"), cuadroB = document.getElementById("cuadroB");
    let aspiradora = document.querySelector(".aspiradora");
    let basura = document.querySelector(".basura");
    let contadorElement = document.getElementById("contador");
    let posicionInicial = (Math.random() > 0.5) ? "cuadroA" : "cuadroB";
    let basuraPosicion = Math.random() < 0.4 ? "cuadroA" : Math.random() < 0.7 ? "cuadroB" : "ambos";
    let basuraPresente = basuraPosicion === posicionInicial || basuraPosicion === "ambos";
    let cuadrosLimpiosContador=0,temporizadorMovimientoAutomatico;
    let modoAutomatico = false;

    function limpiarBasura() {
        if (basuraPresente) {
            const basuraEnCuadroA = cuadroA.querySelector(".basura");
            if (basuraEnCuadroA) {
                cuadroA.removeChild(basuraEnCuadroA); 
                basuraPresente = false;
            }
            const basuraEnCuadroB = cuadroB.querySelector(".basura");
            if (basuraEnCuadroB) {
                basuraPresente = false;
                cuadroB.removeChild(basuraEnCuadroB);
            }
            mostrarMensajeEnHTML("Basura limpiada");
        } else {
            mostrarMensajeEnHTML("No hay basura para limpiar");
        }
    }
    
    function colocarBasura() {
        basuraPresente = true;
        basura.style.display = "block";
        if (posicionInicial === "cuadroA") {
            cuadroA.appendChild(basura);
        } else if (posicionInicial === "cuadroB") {
            cuadroB.appendChild(basura);
        }
        cuadrosLimpiosContador = 0;
        actualizarContador();
        mostrarMensajeEnHTML("Basura colocada en el cuadro donde está la aspiradora");
    }

    function moverAspiradora(destino) {
        limpiarBasura();
        if (destino === "cuadroA") {
            cuadroA.appendChild(aspiradora);
        } else if (destino === "cuadroB") {
            cuadroB.appendChild(aspiradora);
        }
        cuadrosLimpiosContador++;
        basuraPresente = basuraPosicion === destino || basuraPosicion === "ambos";
        actualizarContador();
    }
    //esto es lo nuevo
    function iniciarMovimientoAspiradora() {
        modoAutomatico = true;
        temporizadorMovimientoAutomatico = setTimeout(function() {
            moverAspiradoraAutomaticamente();
        }, 4001); 
    }

    function moverAspiradoraAutomaticamente() {
        let nuevoDestino = (posicionInicial === "cuadroA") ? "cuadroB" : "cuadroA";
        moverAspiradora(nuevoDestino);
        posicionInicial = nuevoDestino;
        iniciarMovimientoAspiradora();
        mostrarMensajeEnHTML("Modo automatico activado");
    }

    function cancelarMovimientoAspiradora() {
        clearTimeout(temporizadorMovimientoAutomatico);
        modoAutomatico = false;
        mostrarMensajeEnHTML("Movimiento automático cancelado");
    }

    function mostrarMensajeEnHTML(mensaje) {
        const mensajeElemento = document.getElementById("mensaje");
        mensajeElemento.textContent = mensaje;
        mensajeElemento.style.display = "block";

        setTimeout(function() {
            mensajeElemento.style.display = "none";
        }, 4000); 
    }
    //fin de lo nuevo
    if (posicionInicial === "cuadroA") {
        cuadroA.appendChild(aspiradora);
    } else if (posicionInicial === "cuadroB") {
        cuadroB.appendChild(aspiradora);
    }

    function actualizarContador() {
        contadorElement.textContent = "Cuadros limpios encontrados: " + cuadrosLimpiosContador;
    }

    if (basuraPosicion === "cuadroA") {
        cuadroA.appendChild(basura);
        basuraPresente = true;
    } else if (basuraPosicion === "cuadroB") {
        cuadroB.appendChild(basura);
        basuraPresente = true;
        console.log("No entra");        
    } else if (basuraPosicion === "ambos") {
        cuadroB.appendChild(basura.cloneNode(true));
        cuadroA.appendChild(basura.cloneNode(true));
    } 

    document.addEventListener("keydown", function(event) {
        if (event.key === "l" || event.key === "L") {
            limpiarBasura();
            if (modoAutomatico == true){
                cancelarMovimientoAspiradora();
             } 
                       
        } else if (event.key === "b" || event.key === "B") {
            colocarBasura();
            if (modoAutomatico == true){
                cancelarMovimientoAspiradora();
             } 
        } else if (event.key === "m" || event.key === "M") {
            let nuevoDestino = (posicionInicial === "cuadroA") ? "cuadroB" : "cuadroA";
            moverAspiradora(nuevoDestino);
            posicionInicial = nuevoDestino;
            if (modoAutomatico == true){
                cancelarMovimientoAspiradora();
             } 
        } else if (event.key === "a" || event.key === "A") {
            iniciarMovimientoAspiradora();
            mostrarMensajeEnHTML("Modo automatico activado");
        } else if (event.key === "s") {
            cancelarMovimientoAspiradora();
        }
    });    
});
