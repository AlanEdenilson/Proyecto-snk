const nodemailer = require('nodemailer');

// Configura el transporte con tus credenciales de correo electrónico
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
    to: '2141872@clases.edu.sv',              // Destinatario
    subject: 'Prueba de orderrshop',          // Asunto
    text: 'hola piola bienvenido a order shop tu codigo es 🤣 7887.' // Cuerpo del mensaje
};

// Enviar el correo electrónico
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(`Error: ${error}`);
    }
    console.log('Correo enviado: %s', info.messageId);
    console.log('URL de vista previa enviado: %s', nodemailer.getTestMessageUrl(info));
});