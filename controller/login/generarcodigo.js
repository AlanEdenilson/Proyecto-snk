const crypto = require('crypto');

module.exports={

    generarcodigo:function generarCodigoAlfanumerico(longitud) {
        const caracteres = '0123456789';
        let resultado = '';
        const bytesAleatorios = crypto.randomBytes(longitud);
        for (let i = 0; i < longitud; i++) {
          resultado += caracteres.charAt(bytesAleatorios[i] % caracteres.length);
        }
        return resultado;
      },


}