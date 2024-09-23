var Megatron = ( function($) {
class Megatron {
    constructor() {
        
    }

    async transformar() {
        try {
            await Modulo1.initDB();
            // Obtener todos los pedidos de la base de datos
            const pedidos = await Modulo1.obtenerPedidos();
            
            // Crear una lista llamada 'change' para almacenar los datos
            let change = [];
            
            // Iterar sobre cada pedido y agregarlo a la lista 'change'
            pedidos.forEach(pedido => {
                const pedidoLimpio = {
                    id: pedido.id,
                    repartidor: pedido.repartidor,
                    Aceptado: pedido.Aceptado,
                    estado: pedido.estado,
                    fecha_entrega: pedido.fecha_entrega
                };
                change.push(pedidoLimpio);
            });
            console.log("Datos extraídos y agregados a la lista 'change':", change);
            
            var estado = await Galbatron.VerificarEstado(change);
            console.log("Estado de los pedidos:", estado);

            var lista = await Galbatron.PrepararRegistros(estado);

            
        } catch (error) {
            console.error("Error al actualizar el estado del checkbox:", error);
        }
    }

    atacar() {
        console.log("Megatron ataca con su cañón de fusión");
    }
}

// Instanciar la clase Megatron
const megatron = new Megatron();

// Retornar la instancia
return{
    transformar:megatron.transformar,

}

})(jQuery);
