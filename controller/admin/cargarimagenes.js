const multer = require('multer')
const { format } = require('date-fns');

// Formatear la fecha actual
const fechaActual = Date.now();
console.log(fechaActual);
console.log(format(fechaActual, 'yyyy-MM-dd HH:mm:ss'));




// Parsear una fecha desde ISO


//middlewar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/images/')
    },
    filename: function (req, file, cb) {
       
        
        // Asigna un nombre al archivo con la fecha
        cb(null,`${fechaActual}_${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage })
  module.exports = upload