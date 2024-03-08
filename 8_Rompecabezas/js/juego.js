
var instrucciones = ["Hola bienvenido al rompecabezas kawaii, por favor utiliza las flechas de navegación para poder mover las piezas", "Ordena las piezas hasta alcanzar la imagen objetivo dentro de la pantalla"];

// Vamos a crear una variable para guardar los movimientos
var movimientos = [];

// Vamos a crear una matriz que represente las posiciones del rompecabezas resuelto de forma correcta y otra matriz con la base original
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var rompeCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Necesito una variable para saber en qué posición se encuentra la pieza vacía
var filaVacia = 2;
var columnaVacia = 2;

// Para las instrucciones
function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
        mostrarInstruccionEnLista(instrucciones[i], "lista-instrucciones");
    }
}

function mostrarInstruccionEnLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

// Vamos hacer una función para agregar la última dirección del movimiento
function agregarUltimoMovimiento(direccion) {
    movimientos.push(direccion);
}

// Necesitamos una función que se encargue de saber si gané
function checarSiGano() {
    for (var i = 0; i < rompe.length; i++) {
        for (var j = 0; j < rompe[i].length; j++) {
            var rompeActual = rompe[i][j];
            if (rompeActual !== rompeCorrecta[i][j]) {
                return false;
            }
        }
    }
    return true;
}

// Función para decir que gané
function mostrarCartelGanador() {
    if (checarSiGano()) {
        alert("¡Wiiii a mimir!");
    }
    return false;
}

// Función para intercambiar las posiciones de las piezas
function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    var pos1 = rompe[filaPos1][columnaPos1];
    var pos2 = rompe[filaPos2][columnaPos2];

    // Intercambio
    rompe[filaPos1][columnaPos1] = pos2;
    rompe[filaPos2][columnaPos2] = pos1;
}

function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

// Tenemos que checar si la posición dentro del rompecabezas es válida
function posicionValida(fila, columna) {
    return (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
}

// Ahora viene la parte del movimiento de las piezas
var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
};

function moverEnDireccion(direccion) {
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    // Si se mueve hacia abajo
    if (direccion === codigosDireccion.ABAJO) {
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }
    // Si se mueve hacia arriba
    if (direccion === codigosDireccion.ARRIBA) {
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }
    // Si se mueve hacia la derecha
    if (direccion === codigosDireccion.DERECHA) {
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia + 1;
    }
    // Si se mueve hacia la izquierda
    if (direccion === codigosDireccion.IZQUIERDA) {
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia - 1;
    }

    // Checar si la nueva posición es válida y sino intercambiarla
    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        // Agregar cual fue el último movimiento
        agregarUltimoMovimiento(direccion);
    }
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
    // Intercambio las posiciones de las piezas
    var pieza1 = rompe[fila1][columna1];
    var pieza2 = rompe[fila2][columna2];

    intercambiarPosicionesRompe(fila1, columna1, fila2, columna2);
    // Para hacerlo visible en el HTML
    intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);
}

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
    // Obtengo los valores de las piezas del HTML
    var elementoPieza1 = document.getElementById(idPieza1);
    var elementoPieza2 = document.getElementById(idPieza2);

    var padre = elementoPieza1.parentNode;

    // Clono el elemento
    var clonElemento1 = elementoPieza1.cloneNode(true);
    var clonElemento2 = elementoPieza2.cloneNode(true);

    padre.replaceChild(clonElemento1, elementoPieza2);
    padre.replaceChild(clonElemento2, elementoPieza1);
}

// Actualizar los movimientos
function actualizarUltimoMovimiento(direccion) {
    var ultimoMov = document.getElementById('flecha');
    switch (direccion) {
        case codigosDireccion.ARRIBA:
            ultimoMov.textContent = '↑';
            break;
        case codigosDireccion.ABAJO:
            ultimoMov.textContent = '↓';
            break;
        case codigosDireccion.DERECHA:
            ultimoMov.textContent = '→';
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMov.textContent = '←';
            break;
    }
}

// Mezclar las piezas
function mezclarPiezas(veces) {
    if (veces <= 0) {
        return;
    }

    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA, codigosDireccion.IZQUIERDA, codigosDireccion.DERECHA];

    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];

    moverEnDireccion(direccion);
    setTimeout(function () {
        mezclarPiezas(veces - 1);
    }, 100);
}

// Saber qué teclas está oprimiendo el jugador
function capturarTeclas() {
    // Necesitamos saber qué tecla se está moviendo
    document.body.onkeydown = (function (evento) {
        if (evento.which === codigosDireccion.ABAJO || evento.which === codigosDireccion.ARRIBA || evento.which === codigosDireccion.IZQUIERDA || evento.which === codigosDireccion.DERECHA) {
            moverEnDireccion(evento.which);
            actualizarUltimoMovimiento(evento.which);

            var gane = checarSiGano();
            if (gane) {
                setTimeout(function () {
                    mostrarCartelGanador();
                }, 500);
            }
            evento.preventDefault();
        }
    });
}

// Iniciar el juego
function iniciar() {
    mezclarPiezas(30);
    capturarTeclas();
}

iniciar();
// Llamar las instrucciones del juego
mostrarInstrucciones(instrucciones);
