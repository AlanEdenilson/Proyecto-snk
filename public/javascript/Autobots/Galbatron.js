var Galbatron = (function($) {
class Galbatron {
    constructor() {
        // Inicialización del objeto Galbatron
    }

    VerificarEstado(lista) {
        console.log("Galbatron se está transformando");
        return new Promise((resolve, reject) => {
            try {
                const nuevaLista = lista.map(pedido => {
                    let nuevoEstado = pedido.estado;
                    
                    if (pedido.repartidor !== null && pedido.Aceptado === true && pedido.fecha_entrega !== null) {
                        nuevoEstado = 'Activado';
                    } else if (pedido.repartidor === null && pedido.fecha_entrega === null && pedido.Aceptado === false) {
                        nuevoEstado = 'Cancelado';
                    } else {
                        nuevoEstado = 'en_proceso';
                    } 
                    
                    return {
                        ...pedido,
                        estado: nuevoEstado
                    };
                });
                
                console.log("Nueva lista con estados actualizados:", nuevaLista);
                resolve(nuevaLista);
            } catch (error) {
                console.error("Error al verificar y actualizar estados:", error);
                reject(error);
            }
        });
    }


    PrepararRegistros(lista) {
    return new Promise((resolve, reject) => {
        try {
            const nuevaLista = lista.flatMap(pedido => {
                const ids = pedido.id.toString().split(',').map(id => id.trim());
                return ids.map(id => ({
                    ...pedido,
                    id: parseInt(id)
                }));
            });
            
            console.log("Nueva lista con registros separados:", nuevaLista);
            resolve(nuevaLista);
        } catch (error) {
            console.error("Error al preparar los registros:", error);
            reject(error);
        }
    });

    }


    EnviarCambios(datos) {
        return new Promise((resolve, reject) => {
            try {
                $.ajax({
                    url: '/gestion/aplicationchange',
                    method: 'POST',
                    data: JSON.stringify(datos),
                    contentType: 'application/json',
                    success: function(respuesta) {
                        console.log("Cambios enviados con éxito:", respuesta);
                        resolve(respuesta);
                    },
                    error: function(error) {
                        console.error("Error al enviar los cambios:", error);
                        reject(error);
                    }
                });
            } catch (error) {
                console.error("Error al preparar la petición AJAX:", error);
                reject(error);
            }
        });
    }

}

// Crear una instancia de Galbatron
const galbatron = new Galbatron();

return {
    VerificarEstado: galbatron.VerificarEstado,
    PrepararRegistros: galbatron.PrepararRegistros,
    EnviarCambios: galbatron.EnviarCambios
}

   

})(jQuery);

// Explicación paso a paso:

// 1. Cierre de la función anónima:
//    La línea '})(jQuery);' cierra una función anónima autoejecutable.

// 2. Paréntesis de cierre '}':
//    Este paréntesis cierra el cuerpo de la función anónima que contiene toda la lógica de Galbatron.

// 3. Paréntesis de invocación '()':
//    Estos paréntesis invocan inmediatamente la función anónima después de su definición.

// 4. Pasando jQuery como argumento:
//    'jQuery' se pasa como argumento a la función anónima. Esto permite usar '$' dentro de la función
//    sin conflictos con otras bibliotecas que puedan usar el mismo símbolo.

// 5. Punto y coma final ';':
//    Termina la expresión de la función autoejecutable.

// Este patrón se conoce como "Módulo Revelador" y ayuda a encapsular la funcionalidad de Galbatron,
// evitando la contaminación del espacio de nombres global.
