$(async function() {
  try {
    await Modulo1.initDB();
    const pedidos = await Modulo1.contarRegistros();
    console.log(pedidos);
    const ultimoId = await Modulo1.obtenerUltimoId();
    console.log(ultimoId);
    const nuevoPedido = await Modulo2.Optimus.realizarPeticionAjax('/gestion/vernuevosregistros?rango=',ultimoId);
    console.log('nuevos pedidos' );
    console.log(nuevoPedido);
    const resultado = await Modulo2.Optimus.modificarNumeroExtraccion(nuevoPedido.nuevosRegistros);
     console.log(resultado);
     
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);


  }


    
});
