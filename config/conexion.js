const { error } = require("console");
const mysql = require("mysql")
const conexion = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'prueba'
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

const consulta = "SELECT * FROM usuario"
conexion.query(consulta, function (error, datos){
    if(error){
        throw error;
    }else{
        console.log(datos);
    }
});
conexion.end();