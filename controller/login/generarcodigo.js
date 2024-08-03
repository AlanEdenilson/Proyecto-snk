const crypto = require('crypto');

module.exports={

    generarcodigo:function () {

      return new Promise((resolve, reject) => {
        try {
          // Generar un número aleatorio de 4 bytes (32 bits)
        const randomBytes = crypto.randomBytes(4);
        const randomNumber = randomBytes.readUInt32BE(0);

        // Escalar el valor para que esté entre 10000 y 99999
        const number = Math.floor(randomNumber / 4294967296 * (99999 - 10000 + 1)) + 10000;

   
          resolve(number);
        } catch (error) {
          reject(  new Error('error al generar codigo'))
        }
        
      })
       
      
      },


}