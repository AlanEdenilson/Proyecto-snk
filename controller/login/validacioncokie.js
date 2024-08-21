const verfication=require('./Gtoken')



module.exports={

    uyyy:function(req,res,next){
        const token = req.cookies.authToken;

        async function yy() {
            try {
               var respuesta = await verfication.validarToken2(token)
               console.log(respuesta)
               next();
            } catch (error) {
                res.render('error')
            }
            
        }

        if (!token) {
            console.log("renviando")
            res.render('login/inicio'); // Si no hay token, devuelve un error 401
        } else {
            yy();
         }



    }


}
