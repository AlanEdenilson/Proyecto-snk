
const mysql = require("mysql")
const conexion = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database:'pruebas'
});

conexion.connect(
    (error) => {
        if (!error){
            console.log("CONEXION EXITOSA");
        }else{
            console.log("La conexion ha fallado...........");
        }
    }
);

/*const consulta = "SELECT usuario, correo FROM usuario WHERE usuario = 'Aaron' && correo = '323456@.com'";

conexion.query(consulta, function (error, datos) {
    if (error) {
        throw error;
    } else {
        if (datos.length > 0) {
            const usuario = datos[0].usuario;
            const correo = datos[0].correo;
            console.log("Usuario encontrado:", usuario);
            console.log("Correo encontrado:", correo);
        } else {
            console.log("No se encontró ningún usuario con el nombre o correo especificado.");
        }
    }
});*/

module.exports = conexion;