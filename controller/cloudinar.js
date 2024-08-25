const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dk56nkrlu',
    api_key: '311488338724542',
    api_secret: '3YAN3n0xrJpBN1ECQ-LgmcBpSMQ'
  });


module.exports={

  subir: async function(imagen) {



    try {

      return await cloudinary.uploader.upload(imagen)

      
    } catch (error) {
      console.log(error)
      
    }

    
    
  },
  actualizar:async function(imagen,id){

    try {

      return await cloudinary.uploader.upload(imagen,{
        public_id: id, // Usa el mismo public_id para sobrescribir
        overwrite: true})

      
    } catch (error) {
      console.log(error)
      
    }

    


  },
  delete:async function(id){
    try{

      return await cloudinary.uploader.destroy(id);

    } catch(error){
      console.error({ error: 'Error al borrar la imagen' });

    }
  }
}