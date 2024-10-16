const nodemailer = require('nodemailer');


module.exports={
    enviaremail:function(email,codigo){
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Puedes usar otros servicios como 'Yahoo', 'Outlook', etc.
            auth: {
                user: 'ordershop503@gmail.com', // Reemplaza con tu correo electrónico
                pass: 'pizhuhizbpcmdlwn'       // Reemplaza con tu contraseña
            }
        });
      return new Promise((resolve, reject) => {
        
        // Configuración del correo electrónico
        let mailOptions = {
            from: 'ordershop503@gmail.com',               // Remitente
            to: email,              // Destinatario
            subject: 'Codigo de verificacion',          // Asunto
            text: `tu codigo es ${codigo}`,
            html:`
            
            <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codigo de Verificacion</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            positio: absolute;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .log{
            width: 100%;
            height:  200px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h1 {
            color: #333;
        }
        .content p {
            color: #666;
        }
        .code {
            display: inline-block;
            background-color: #f1f1f1;
            padding: 10px 20px;
            font-size: 24px;
            letter-spacing: 5px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            color: #999;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div>

            <img src="https://res.cloudinary.com/dphpc7b2w/image/upload/v1723056209/logodordedshop_iizpqo.jpg" alt="" class="log">

 
        </div>
        <div class="content">
            <h1>Codigo de Verificacion</h1>
            <p>Gracias por registrarte. Por favor, usa el siguiente código para verificar tu Cambio de contraseña:</p>
            <div class="code"> ${codigo}</div>
            <p>Si no solicitaste este correo, puedes ignorarlo.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 AGAJE. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
            ` // fin de la coma
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            }
                console.log('Correo enviado: %s', info.messageId);
                console.log("a tu gmail :" + codigo +"::"+ email)
                console.log('URL de vista previa enviado: %s', nodemailer.getTestMessageUrl(info));
                resolve(true)

            
            
        });
      })

    }

}



// Configura el transporte con tus credenciales de correo electrónico



// Enviar el correo electrónico
