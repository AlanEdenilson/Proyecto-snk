$(function () {

     //actualizar fecha
    $(document).on('change', '#fecha', async function() {
        let fecha = $(this).val();
        console.log('Fecha de entrega seleccionada:', fecha);
        
        let filaId = $(this).closest('tr').attr('data-id');
        console.log('ID de la fila:', filaId);

        BD.change(filaId, 'fecha_entrega', fecha);
        console.log('actualizando...')
        
       
      });

      //actualizar el ok
      $(document).on('change', '#aceptado', async function() {
        let estaCheckeado = $(this).prop('checked');
        console.log('El checkbox está:', estaCheckeado ? true : false);
    
        let filaId = $(this).closest('tr').attr('data-id');
        console.log('ID de la fila:', filaId);
        BD.change(filaId, 'Aceptado', estaCheckeado);
        console.log('actualizando...')

        
      });

      //actualizar repartidor
      $(document).on('click', '#repartidor',async function() {
          
      $(this).on('change',async  function() {
        //nombre del repartidor
        let textoRepartidor = $(this).find('option:selected').text();
        console.log('Texto del repartidor seleccionado:', textoRepartidor);
        // id del repartidor
        let selectedRepartidor = $(this).val();
        console.log('Valor del repartidor seleccionado:', selectedRepartidor);
        let filaId = $(this).closest('tr').attr('data-id');
            console.log('ID de la fila:', filaId);
            BD.change(filaId, 'repartidor', selectedRepartidor);
            BD.change(filaId, 'repartidorn', textoRepartidor);
        //    var e= await Modulo1.editar(filaId, 'repartidor', selectedRepartidor);
        //    var l= await Modulo1.editar(filaId, 'repartidorn', textoRepartidor);
        
        });
    });

    


$(document).off('keydown').on('keydown',async function(e) {
    if (e.which === 13) { // 13 es el código de la tecla Enter

        if ($('#tool').text()==='Activado'){
          console.log('Cancelando pedidos...')
          var datos = await BD.print()
            console.log('estraendo los datos de la bd ')
            console.log(datos)
            var change= await write.CHange(datos);
            var list = await write.PRepare(change);
            var IDS= await write.EXids(change);
            var respuesta = await write.mandar(IDS);
            console.log('respuesta del envio', respuesta)
            await BD.deleteAll();

        }else{
          console.log('Modificando pedidos...')
          try {
            var datos = await BD.print()
            console.log('estraendo los datos de la bd ')
            console.log(datos)
            var changes = await write.CHange1(datos);
            var list = await write.PRepare(changes)
            var IDS= await write.EXids(changes);
            await Galbatron.EnviarCambios(list);
           for (const id of IDS) {
               console.log('Procesando ID:', id);
               await BD.delete(id);
           }
          } catch (error) {
            console.log(error)
            
          }

        }
    }
});



    
})