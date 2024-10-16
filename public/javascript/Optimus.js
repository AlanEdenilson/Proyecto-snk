var Modulo2 = (function($){
    class Comprration {
        constructor() {
            this.repartidores = localStorage.getItem('repartidores') || [];
            // Constructor vacío
        }
    
        realizarPeticionAjax(url,rango) {
                return new Promise((resolve, reject) => {
                $.ajax({
                    url: url+rango,
                    type: "GET",
                    success: function(response) {
                        resolve(response);
                    },
                    error: function(xhr, status, error) {
                        console.log(error)
                        reject(error);
                    }
                });


                });

        }

    
      
        modificarNumeroExtraccion(nuevosRegistros) {
            return new Promise((resolve, reject) => {
                try {
                    // Seleccionar el elemento span de notificación
                    const notificacionSpan = $('.notificacion');
                    
                    // Mostrar el span
                    if(nuevosRegistros == 0){
                       
                       
                        notificacionSpan.hide();
                    }else{
                        notificacionSpan.show();
                        $('#boton-extraer').css({'display':'block'})
                    }
                    
                    // Modificar el número a 1
                    notificacionSpan.text(nuevosRegistros);
                    
                    resolve('Número de extracción modificado con éxito');
                } catch (error) {
                    reject('Error al modificar el número de extracción: ' + error);
                }
            });
        }


    imprimirRepartidores() {
        return new Promise((resolve, reject) => {
            try {
                // Obtener el array de repartidores del localStorage
               
                if (!this.repartidores) {
                    throw new Error('No se encontraron repartidores en el localStorage');
                }

                const repartidores = JSON.parse(this.repartidores);

                // Imprimir los repartidores en la consola
                console.log('Lista de Repartidores:');
                repartidores.forEach(repartidor => {
                    console.log(`ID: ${repartidor.id}, Nombre: ${repartidor.nombre}`);
                });

                resolve('Repartidores impresos con éxito');
            } catch (error) {
                reject('Error al imprimir repartidores: ' + error.message);
            }
        });
    }
        
    }
     const Compration = new Comprration();
     return {
        Optimus: Compration
     }
     



})(jQuery);
