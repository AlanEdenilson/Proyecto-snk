
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

/*const consulta = "SELECT usuario, correo FROM usuario WHERE usuario = 'Alancita' && correo = 'alancita@.com'";

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

function insertarUsuario(id_rol, usuario, correo, contraseña) {
    const consulta = 'INSERT INTO usuario (id_rol, usuario, correo, contraseña) VALUES (?, ?, ?, ?)';
    const valores = [id_rol, usuario, correo, contraseña];

    conexion.query(consulta, valores, (error, resultados) => {
        if (error) {
            console.error('Error insertando datos:', error.stack);
            return;
        }
        console.log('Datos insertados con éxito:', resultados.insertId);
    });
}

insertarUsuario(1, 'Aroncito', 'aroncito@.com', '87654321');

setTimeout(() => {
    conexion.end((err) => {
        if (err) {
            console.error('Error cerrando la conexión:', err.stack);
            return;
        }
        console.log('Conexión cerrada.');
    });
}, 2000);

module.exports = conexion;