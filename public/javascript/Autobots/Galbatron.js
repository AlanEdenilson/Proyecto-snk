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
        

    }

}

// Crear una instancia de Galbatron
const galbatron = new Galbatron();

return {
    VerificarEstado: galbatron.VerificarEstado
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
