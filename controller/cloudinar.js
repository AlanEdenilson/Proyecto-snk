const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dphpc7b2w',
    api_key: '145857856899796',
    api_secret: 'qxaQRJc9gqS4k8WawMwp4rAXeBk'
  });

  function erores(error) {
    var erores=error.error
    console.log(erores.code)

      let errorMessage = 'Ocurrió un error al subir la imagen.';
      let statusCode = 500;
  
      switch(true) {
        case erores.message === 'ETIMEDOUT':
          errorMessage = 'La conexión es demasiado lenta. Por favor, inténtalo de nuevo.';
          break;
        case erores.http_code === 401:
          errorMessage = 'Error de autenticación con Cloudinary.';
          statusCode = 401;
          break;
        case erores.http_code === 403:
          errorMessage = 'No tienes permiso para realizar esta acción en Cloudinary.';
          statusCode = 403;
          break;
        case erores.message === 'No se proporcionó ningún archivo':
          errorMessage = 'Por favor, selecciona una imagen para subir.';
          statusCode = 400;
          break;
        case erores.message.includes('File size too large'):
          errorMessage = 'El archivo es demasiado grande. Por favor, selecciona una imagen más pequeña.';
          statusCode = 400;
          break;
        case erores.message.includes('Invalid image file'):
          errorMessage = 'El archivo no es una imagen válida. Por favor, selecciona un formato de imagen soportado.';
          statusCode = 400;
          break;
        case erores.code === 'ECONNREFUSED':
          errorMessage = 'No se pudo conectar con Cloudinary. Por favor, verifica tu conexión a internet.';
          break;
        case erores.code === 'ENOTFOUND':
          errorMessage = 'No se pudo encontrar el servidor de Cloudinary. Verifica tu conexión a internet.';
          break;
        case erores instanceof multer.MulterError:
          errorMessage = 'Error al procesar el archivo. Por favor, inténtalo de nuevo.';
          statusCode = 400;
          break;
      }
      
     return errorMessage
    
  }


module.exports={

  subir: async function(imagen) {



    try {

      return await cloudinary.uploader.upload(imagen)
     /* const result = await Promise.race([
        cloudinary.uploader.upload(imagen),
        new Promise((_, reject) => setTimeout(() => reject(new Error('ETIMEDOUT')), 30000))
      ]);
      return result*/

      
    } catch (error) {
      var r =erores(error)

      return new Promise((resolve, reject) => {
        reject(r)
       
     })
    
      
     
      
    }

    
    
  },
  actualizar:async function(imagen,id){

    try {

      return await cloudinary.uploader.upload(imagen,{
        public_id: id, // Usa el mismo public_id para sobrescribir
        overwrite: true})

      
    } catch (error) {
      var r =erores(error)

      return new Promise((resolve, reject) => {
        reject(r)
       
     })
    
    
      
      
      
    }
   
    


  },
  delete:async function(id){
    try{

      return await cloudinary.uploader.destroy(id);

    } catch(error){
    
      var r =erores(error)

      return new Promise((resolve, reject) => {
        reject(r)
       
     })
    

    }
  }
}