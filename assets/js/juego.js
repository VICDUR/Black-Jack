/* 
2C = two of clubs
2D = two of Diaminds
2H = two of Hearts
2S = two of spades
*/

//  PopUp boxes 
const  mensaje = (message, icon = 'success') => {
    
    Swal.fire({
        position: 'top-center',
        icon: icon, //'success',
        color: '#e8eab3',
        background: 'black',
        title: message,
        showConfirmButton: false,
        timer: 2000,
        // showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        //   },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          }
      })

    // Swal.fire({
    //     title: message,
    //     color: '#766a1d',
    //     showClass: {
    //       popup: 'animate__animated animate__fadeInDown'
    //     },
    //     hideClass: {
    //       popup: 'animate__animated animate__fadeOutUp',
    //     }
    // });
};



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
          divCartasJugadores = document.querySelectorAll('.divCartas');




    // Esta función inicializa el juego y reseta  los puntajes y limpia la mesa del juego
    const inicializarJuego = ( numJugadores = 2)=>{

          deck = crearDeck();

          puntosJugadores = [];
          for(let i = 0; i < numJugadores; i++ ){
             puntosJugadores.push(0);
          };

        puntosJuegos.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );
        
        btnNuevo.disabled = true;
        btnPedir.disabled = false;
        btnDetener.disabled = false;
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
             
        return _.shuffle(deck);
    };

    

    // Esta función pide una carta al deck
    const pedirCarta = () => {

        if (deck.length === 0)  throw 'No hay Cartas en el deck'; // esto nunca va a pasar 
        return deck.pop();
    };


    // pedirCarta();
    const valorCarta = ( carta ) => {
        let valor =  carta.substring(0, carta.length -1);
        return (isNaN(valor)) 
            ?  ( valor === 'A') ? 11 : 10 
            :  valor * 1 ;
    };



    //turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno )=>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosJuegos[turno].innerText= puntosJugadores[turno];
        return puntosJugadores[turno];
    };




    const crearCarta = (carta, turno)=>{

        const imgCarta = document.createElement('img');
        imgCarta.src=`/assets/cartas/${carta}.png`;  
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
    };


    // valiga el ganador y renderiza un PopUp con su mensaje
    const determinarGanador = ()=>{

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) mensaje('Nadie gana :(', 'error');
            else if ( puntosMinimos > 21 ) mensaje(`Computadora gano`, 'success');
            else if ( puntosComputadora > 21 ) mensaje(`Jugador gano`,'success');
            else mensaje(`Computadora gana genial`,'error' );
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

        const carta = pedirCarta(); 

        const puntosJugador = acumularPuntos(carta, 0)

        crearCarta(carta, 0);

        if ( puntosJugador > 21 ) {

                turnoComputadora(puntosJugadores[0]);
                btnNuevo.disabled = false;

        }else if ( puntosJugador === 21 ){

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


    return {
        nuevoJuego : inicializarJuego
    };

})();
