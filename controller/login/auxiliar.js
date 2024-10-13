
function sino(res,ruta,imagen,nombre) {
    if(ruta==="admin" ){
        res.render('login/ventanaAdmin',{imagen:imagen,nombre:nombre});
    }else if(ruta==="repartidor" ){
        res.render('repartidor/ventas_repartido');
    }     
}
//hola
    


module.exports={

    mostrarventanas:function (res,rol) {
        
        if(rol==="admin"){
            
          
            res.render('login/ventanaAdmin');
        }else if(rol==="repartidor"){
            res.render('repartidor/ventas_repartido');
         
        }     
    


    } , 
    mostrarVentanas2:function (res,rol,imagen,nombre) {
                sino(res,rol,imagen,nombre);
    
    } ,

 

    

}; //fin 

    