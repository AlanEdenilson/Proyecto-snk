const nodemailer = require('nodemailer');
var random = require('../login/index');

module.exports={
    enviaremail:function(email,codigo){

        let transporter = nodemailer.createTransport({
            service: 'gmail', // Puedes usar otros servicios como 'Yahoo', 'Outlook', etc.
            auth: {
                user: 'ordershop503@gmail.com', // Reemplaza con tu correo electrónico
                pass: 'pizhuhizbpcmdlwn'       // Reemplaza con tu contraseña
            }
        });
        
        // Configuración del correo electrónico
        let mailOptions = {
            from: 'ordershop503@gmail.com',               // Remitente
            to: email,              // Destinatario
            subject: 'Prueba de orderrshop',          // Asunto
            text: `tu codigo es ${codigo}` // Cuerpo del mensaje
        };
        
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            }else{
                console.log('Correo enviado: %s', info.messageId);
                console.log("a tu gmail :" + codigo +"::"+ email)
                console.log('URL de vista previa enviado: %s', nodemailer.getTestMessageUrl(info));
                resolve(true)

            }
            
        });
      })

    }

}



// Configura el transporte con tus credenciales de correo electrónico



// Enviar el correo electrónico
