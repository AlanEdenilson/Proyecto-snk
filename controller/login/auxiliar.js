
function sino(res,ruta) {
    if(ruta==="1" ||ruta===1){
        res.render('login/ventanaAdmin');
    }else if(ruta==="2" ||ruta===2){
        res.render('login/ventanaRpartidor');
    }     
}

    


module.exports={

    mostrarventanas:function (res,rol,gmail) {
        if(rol==="1" || rol===1){
            res.render('login/ventanaAdmin',{correo:gmail});
        }else if(rol==="2" || rol===2){
            res.render('login/ventanaRpartidor',{correo:gmail});
        }     
    


    } , 
    mostrarVentanas2:function (res,rol) {
                sino(res,rol);
    
    } ,

 

    

}; //fin 

    