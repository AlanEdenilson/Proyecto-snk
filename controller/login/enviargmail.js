const nodemailer = require('nodemailer');
var random = require('../login/index');
module.exports={
    enviaremail:function(correo,codigoA){
        let transporter = nodemailer.createTransport({
            service: 'Gmail', // Puedes usar otros servicios como 'Yahoo', 'Outlook', etc.
            auth: {
                user: 'ordershop503@gmail.com', // Reemplaza con tu correo electrónico
                pass: 'pizhuhizbpcmdlwn'       // Reemplaza con tu contraseña
            }
        });
        
        // Configuración del correo electrónico
        let mailOptions = {
            from: 'ordershop503@gmail.com',               // Remitente
            to: correo,              // Destinatario
            subject: 'Prueba de orderrshop',          // Asunto
            text: `tu codigo es ${codigoA}` // Cuerpo del mensaje
        };
        
        // Enviar el correo electrónico
         transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(`Error: ${error}`);
            }
            console.log('Correo enviado: %s', info.messageId);
            console.log("tu codigo generado es listo para mandar gmail :"+codigoA + correo)
            console.log('URL de vista previa enviado: %s', nodemailer.getTestMessageUrl(info));
         
            
        });

    }

}



// Configura el transporte con tus credenciales de correo electrónico


