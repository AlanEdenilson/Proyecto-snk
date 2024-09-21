var Modulo2 = (function($){
    class Comprration {
        constructor() {
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
                    notificacionSpan.show();
                    
                    // Modificar el número a 1
                    notificacionSpan.text(nuevosRegistros);
                    
                    resolve('Número de extracción modificado con éxito');
                } catch (error) {
                    reject('Error al modificar el número de extracción: ' + error);
                }
            });
        }
        
    }
     const Compration = new Comprration();
     return {
        Optimus: Compration
     }
     



})(jQuery);
