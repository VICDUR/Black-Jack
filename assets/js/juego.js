
// function anonima auto invocada ---> patron modulo
const miModulo = (()=> {
    'use strict'


    let deck         = [];
    const tipos      = [ 'C','D', 'H', 'S'],
          especiales = [ 'A',  'J',  'Q',  'K', ];

    let puntosJugadores = [];


    // Referencia HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnNuevo = document.querySelector('#btnNuevo'),
          btnDetener = document.querySelector('#btnDetener');

    const puntosJuegos = document.querySelectorAll('small'), 
          divCartasJugadores = document.querySelectorAll('.divCartas'),
          nombreJugador = document.querySelectorAll('h1');


    const cambiarNombreJugador = async() => {
        let jugador = await ingresarNombreJugador();
        nombreJugador[0].innerText = jugador || 'Jugador' ;
    };


    // Esta función inicializa el juego y reseta  los puntajes y limpia la mesa del juego
    const inicializarJuego = ( numJugadores = 2)=>{

        cambiarNombreJugador();
          deck = crearDeck();

          puntosJugadores = [];
          for(let i = 0; i < numJugadores; i++ ){
             puntosJugadores.push(0);
          };

        puntosJuegos.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );
        
        btnNuevo.disabled = true;
        btnPedir.disabled = false;
        btnDetener.disabled = true;
    };     


    // Esta funcion crea una nueva deck
    const crearDeck  = () => {

        deck = [];

        for(let i = 2; i <= 10; i++){  
            for(let tipo of tipos){  
            deck.push(i + tipo);
            };
        };
        
        for (const tipo of tipos) { 
            for (const especial of especiales) {
                deck.push( especial + tipo)
            }
        };
        
        // function que recibe como argumentos el array de cartas
        //  y devuelve un array de cartas desorganizadas
        //  libreria underscore
        return _.shuffle(deck);

    };

    

    // Esta función pide una carta al deck
    const pedirCarta = () => {

        if (deck.length === 0)  throw 'No hay Cartas en el deck'; // esto nunca va a pasar 
        console.log(deck)
        return deck.pop();
    };


    // Esta función da valor a la carta y uno de los plus es que la A puede valer 1 o 11
    // según el marcador del jugador, hay pendientes otras validaciones futuro;
    const valorCarta = ( carta, turno  ) => {

        let valor =  carta.substring(0, carta.length -1);
      
        return (isNaN(valor)) 
                 ? valor === 'A'
                     ? (puntosJugadores[turno] <= 10) ? 11 : 1  
                     : 10
                 : valor * 1;
    };



    //turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno )=>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta, turno );
        puntosJuegos[turno].innerText= puntosJugadores[turno];
        return puntosJugadores[turno];
    };



    const crearCarta = (carta, turno)=>{

        const imgCarta = document.createElement('img');
        imgCarta.src=`/assets/cartas/${carta}.png`;  
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
    };



    // valida el ganador y renderiza un PopUp con su mensaje
    const determinarGanador = ()=>{

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) mensaje('Nadie gana :(', 'error');
            else if ( puntosMinimos > 21 ) mensaje(`Computadora gano`);
            else if ( puntosComputadora > 21 ) mensaje(`Jugador gano`);
            else mensaje(`Computadora gana genial` );
            
        }, 300);
    };


    // turno computadora
    const turnoComputadora = (puntosMinimos)=> {

        btnDetener.disabled = true;
        let puntosComputadora = 0 ;

        do {
            const carta = pedirCarta(); 

            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);
            crearCarta(carta, divCartasJugadores.length -1);

            if (puntosMinimos > 21 ) break; 

        } while ( (puntosComputadora < puntosMinimos ) && (puntosMinimos <= 21) );

        
        determinarGanador();
        btnPedir.disabled = true;
    };


    // Eventos boton pedir
    btnPedir.addEventListener('click', () => {

        btnNuevo.disabled =true;
        btnDetener.disabled = false;

        const carta = pedirCarta(); 

        const puntosJugador = acumularPuntos(carta, 0)

        crearCarta(carta, 0);

        if ( puntosJugador > 21 || puntosJuegos === 21 ) {
                turnoComputadora(puntosJugadores[0]);
                btnNuevo.disabled = false;
        };

    });
       


    // Eventos boton detener
    btnDetener.addEventListener('click', ()=> {
        
        btnNuevo.disabled =false;
        btnPedir.disabled = true;
        turnoComputadora(puntosJugadores[0]); 
        btnDetener.disabled = true; 

    });


    // Eventos boton nuevo
    btnNuevo.addEventListener('click', ()=>{

        inicializarJuego();

    });

    // function  hecha publica
    return {
        nuevoJuego : inicializarJuego,
    };

})();
