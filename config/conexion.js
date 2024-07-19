
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

const consulta = "SELECT * FROM usuario WHERE usuario = 'Aaron'";

conexion.query(consulta, function (error, datos) {
    if (error) {
        throw error;
    } else {
        if (datos.length > 0) {
            console.log("Usuario encontrado:", datos);
        } else {
            console.log("No se encontró ningún usuario con el nombre especificado.");
        }
    }
});

conexion.end();