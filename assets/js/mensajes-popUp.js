
const ingresarNombreJugador = async() => {
    
    // PopUp inputs
    const { value: nombre } = await Swal.fire({
        title: 'Nombre del jugador',
        input: 'text',
        inputPlaceholder: 'Digite su nombre',
        color: '#e8eab3',
        background: 'black',
        confirmButtonColor: '#2e4f31',
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
      });

      return nombre.length > 8 
        ? `${nombre.trim().slice(0,13)}...`
        : nombre
};




//  PopUp boxes 
const  mensaje = (message, icon = 'success') => {
    
    Swal.fire({
        position: 'top-center',
        icon: icon, 
        color: '#e8eab3',
        background: 'black',
        title: message,
        showConfirmButton: false,
        timer: 2000,
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          }
      });
};


//TODO info pop up mensajes por crear ...