const jwt = require('jsonwebtoken');


module.exports={
    generarToken:function generarToken(payload) {
        return jwt.sign(payload,'buy787by87y87y87y87y878y7y7y');
    },
    validarToken:function validarToken(token) {
           
        return jwt.verify(token,'buy787by87y87y87y87y878y7y7y');
    }
    //... otros métodos para validar y generar tokens en otras partes de tu aplicación...  //
}