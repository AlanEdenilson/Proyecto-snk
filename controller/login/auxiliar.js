
function sino(res,ruta,imagen,nombre) {
    if(ruta==="1" ||ruta===1){
        res.render('login/ventanaAdmin',{imagen:imagen,nombre:nombre});
    }else if(ruta==="2" ||ruta===2){
        res.render('login/ventanaRpartidor');
    }     
}
//hola
    


module.exports={

    mostrarventanas:function (res,rol,token) {
        
        if(rol==="1" || rol===1){
          
            res.render('login/ventanaAdmin',{imagen:token.imagen,nombre:token.nombre,marca:token.marca});
        }else if(rol==="2" || rol===2){
            res.render('login/ventanaRpartidor',{correo:gmail});
            console.log("gmail: "+ gmail)
        }     
    


    } , 
    mostrarVentanas2:function (res,rol,imagen,nombre) {
                sino(res,rol,imagen,nombre);
    
    } ,

 

    

}; //fin 

    