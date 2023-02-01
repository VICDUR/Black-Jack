/* 
2C = two of clubs
2D = two of Diaminds
2H = two of Hearts
2S = two of spades
*/

let deck         = [];
const tipos      = [ 'C','D', 'H', 'S']
const especiales = [ 'A',  'J',  'Q',  'K', ]

let puntosJugador = 0,
    puntosComputadora = 0;


// Referencia HTML
const nombreJugador = document.querySelector('h1');
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');

const puntosJuegos = document.querySelectorAll('small')

const cartasJugador = document.querySelector('#jugador-cartas');
const cartasComputador = document.querySelector('#Computadora-cartas');


let nombrePlayer = prompt('Escriba su nombre')

nombreJugador.innerText = nombrePlayer;

// Esta funcion crea una nueva deck
const crearDeck  = () => {
    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
           deck.push(i + tipo);
        };
    };

    for (const tipo of tipos) {
        for (const especial of especiales) {
            deck.push( especial + tipo)
        }
    }

    // funcion que baraja mi carta
    deck = _.shuffle(deck); 
    console.log(deck);
    return deck;
   
};

crearDeck();


// Esta función me permite pedir una carta
const pedirCarta = () => {
    
    if (deck.length === 0)  throw 'No hay Cartas en el deck';
    const carta = deck.pop();
    console.log(carta)
    return carta;
};


// pedirCarta();
const valorCarta = ( carta ) => {
   
    let valor =  carta.substring(0, carta.length -1);
    
    return (isNaN(valor)) 
        ? puntos = ( valor === 'A') ? 11 : 10 
        : puntos = valor * 1;

};


// turno computadora
const turnoComputadora = (puntosMinimos)=> {

    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosJuegos[1].innerText= puntosComputadora;
        
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta')
        imgCarta.src=`/assets/cartas/${carta}.png`  
        cartasComputador.append( imgCarta );

        if (puntosMinimos > 21 ) break; 

    } while ( (puntosComputadora < puntosMinimos ) && (puntosMinimos <= 21) );

    
    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) alert('Nadie gana :(');
        else if ( puntosMinimos > 21 ) alert(`Computadora gano`);
        else if ( puntosComputadora > 21 ) alert(`Jugador gano`);
        else alert(`computadora Gana genial`)
    }, 300);

};




// Eventos 

btnPedir.addEventListener('click', function(){

   const carta = pedirCarta();

   puntosJugador = puntosJugador + valorCarta( carta );
   puntosJuegos[0].innerText= puntosJugador;

   const imgCarta = document.createElement('img');
   imgCarta.classList.add('carta')
   imgCarta.src=`/assets/cartas/${carta}.png`  
   cartasJugador.append( imgCarta );

   if ( puntosJugador > 21 ) {

       btnPedir.disabled = true;
       btnDetener.disabled = true;
       turnoComputadora(puntosJugador);

    } else if ( puntosJugador === 21 ){
       
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    };

});

btnDetener.addEventListener('click', ()=> {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);

})


btnNuevo.addEventListener('click', ()=>{
    
    console.clear();
    
    deck = [];
    deck = crearDeck();
    
    puntosJugador = 0;
    puntosComputadora = 0;
    
    puntosJuegos[0].innerText = 0;
    puntosJuegos[1].innerText = 0;

    cartasJugador.innerHTML = '';
    cartasComputador.innerHTML = '';


    btnPedir.disabled = false;
    btnDetener.disabled = false;
});


