var mysql = require("mysql");
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prueba'
});

con.connect(

    (err)=>{
        if(!err){
            console.log('conexion establecida');
        } else{
            console.log('error en la conexion')
        }
    }
);
module.exports = con;