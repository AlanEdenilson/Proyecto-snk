const jwt = require('jsonwebtoken');


module.exports={
    generarToken:function generarToken(payload) {
        return jwt.sign(payload, 'your_secret_key');
    },
    validarToken:function validarToken(token) {
        return jwt.verify(token, 'your_secret_key');
    }
    //... otros métodos para validar y generar tokens en otras partes de tu aplicación...  //
}