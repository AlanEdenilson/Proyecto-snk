const crypto = require('crypto');
const model =require('../../model/adminc/index')
const conexion = require('../../config/conexion');


function gcodigo(){
  // Generar un número aleatorio de 4 bytes (32 bits)
  const randomBytes = crypto.randomBytes(5);
  const randomNumber = randomBytes.readUInt32BE(0);

  // Escalar el valor para que esté entre 10000 y 99999
  return Math.floor(randomNumber / 4294967296 * (99999 - 10000 + 1)) + 10000;
}

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

      //codigo de marca

      generarid:function () {
        var codigo=gcodigo();
        var busqueda;
        return new Promise((resolve, reject) => {
          try {
            
         async function buscar(c){
          
          if (await model.buscarId(conexion,c)) {
            return true
          }else{
            return false
          }

          

        }
            busqueda=buscar(codigo);

            while(busqueda){
              
              codigo=gcodigo()
              busqueda=buscar(codigo)

            }
            resolve(codigo);
          } catch (error) {
            reject(  new Error('error al generar codigo puede ser que ya exista'))
          }
          
        })


}
}