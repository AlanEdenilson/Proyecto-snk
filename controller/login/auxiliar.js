module.exports={

    mostrarventanas:function (res,token,rdatabase) {
        if (rdatabase === true)  {
            if(token.rol==="1"){
                res.render('login/ventanaAdmin');
            }else if(token.rol==="2"){
                res.render('login/ventanaRpartidor');
            }
        }
        
    }

}; //fin 