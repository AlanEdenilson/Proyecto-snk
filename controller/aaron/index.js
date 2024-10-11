const conexion = require('../../config/conexion');
const model = require('../../model/aaron/index')
const Gtoken = require('../login/Gtoken');7


module.exports={
    vermarca: async function (req,res) {
        const token = req.cookies.refreshToken;
        if (!token) {
            res.send('no tienes token')
            
        } 
        
        try {
            var validar = await Gtoken.validarToken2(token)
            console.log('este es el token maldito ')
            console.log(validar)

            var result = await model.vermarcas(conexion,validar.id)
            console.log(result)
            res.send(result)

        } catch (error) {
            console.error(error)
            res.send(error)
            
        }

    },
    verpedido: async function (req,res) {
        const token = req.cookies.refreshToken;
        if (!token) {
            res.send('no tienes token')
            
        } 
        
        try {
            var validar = await Gtoken.validarToken2(token)
            console.log('este es el token: ')
            console.log(validar)

            var result = await model.verpedido(conexion,validar.id)
            console.log(result)
            res.send(result)

        } catch (error) {
            console.error(error)
            res.send(error)
            
        }

    },
}