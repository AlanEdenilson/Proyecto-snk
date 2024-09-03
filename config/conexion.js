
const mysql = require("mysql")
const conexion = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database:'order_shop'
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

module.exports = conexion;