$(async function(){
   console.log('pagina mini se cargo')

    try{
        await Modulo1.initDB();
        Modulo1.cargarDatos();
        await Modulo1.contarRegistros()
    } catch(er){
        console.error('Error al inicializar la base de datos', er)

    }




  

})