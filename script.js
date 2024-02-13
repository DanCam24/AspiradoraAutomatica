document.addEventListener("DOMContentLoaded", function() {
    let cuadroA = document.getElementById("cuadroA");
    let cuadroB = document.getElementById("cuadroB");
    let aspiradora = document.querySelector(".aspiradora");
    let basura = document.querySelector(".basura");
    let contadorElement = document.getElementById("contador");
    let posicionInicial = prompt("Ingrese la posición inicial de la aspiradora (cuadroA o cuadroB):") || "cuadroA";
    let basuraPosicion = prompt("Ingrese la posición de la basura (cuadroA, cuadroB o ambos):") || "ambos";
    let basuraPresente = basuraPosicion === posicionInicial || basuraPosicion === "ambos";
    let cuadrosLimpiosContador = 0;
    let temporizadorMovimientoAutomatico;
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
            alert("Basura limpiada");
        } else {
            alert("No hay basura para limpiar");
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
        alert("Basura colocada en el cuadro donde está la aspiradora");
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
        }, 3000); 
    }

    function moverAspiradoraAutomaticamente() {
        let nuevoDestino = (posicionInicial === "cuadroA") ? "cuadroB" : "cuadroA";
        moverAspiradora(nuevoDestino);
        posicionInicial = nuevoDestino;
        iniciarMovimientoAspiradora();
    }

    function cancelarMovimientoAspiradora() {
        clearTimeout(temporizadorMovimientoAutomatico);
        modoAutomatico = false;
        alert("Movimiento automático cancelado");
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
        } else if (event.key === "s") {
            cancelarMovimientoAspiradora();
        }
    });    
});
