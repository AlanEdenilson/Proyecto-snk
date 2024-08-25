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

    
    
  }
}