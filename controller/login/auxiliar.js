
function sino(res,ruta) {
    if(ruta==="1"){
        res.render('login/ventanaAdmin');
    }else if(ruta==="2"){
        res.render('login/ventanaRpartidor');
    }     
}

    


module.exports={

    mostrarventanas:function (res,token,rdatabase) {
        if ( rdatabase === true)  {
                sino(res,token.rol);  
    }


} , 
    mostrarVentanas2:function (res,rol) {
                sino(res,rol);
    
    }

}; //fin 

    