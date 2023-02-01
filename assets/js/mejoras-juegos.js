let puntosJugador = 20
let puntosComputadora = 1

// pedirCarta();
const valorCarta = ( carta, player ) => {
   
    let valor =  carta.substring(0, carta.length -1);
    
    return (isNaN(valor)) 
        ? puntos = ( (valor === 'A') && (player <= 10)) ? 11 : 1 
        : puntos = valor * 1;

};


console.log({'computadora: ': valorCarta('AQ', puntosJugador)});
console.log({'jugador: ': valorCarta('AQ', puntosComputadora)});