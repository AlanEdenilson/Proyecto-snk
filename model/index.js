// generar con sultas 
//actualizar datos
//crear datos 
// de log-in




module.exports = {
    buscarusuario:function (conexion,username,password) {
        const consulta = `SELECT usuario, contraseña FROM usuario WHERE usuario = '${username}' AND contraseña ='${password}'`;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    return reject(error);
                } else {
                    if (datos.length > 0) {
                       /* const usuario = datos[0].usuario;
                        const contraseña = datos[0].contraseña;
                        resolve({usuario,contraseña });*/
                        resolve(true);
                    } else {
                        resolve(false); // No se encontró ningún usuario
                    }
                }
            });
        });
    }
    
    
    /*function(conexion) {
        
      
         const buscarUser = buscarUsuario(conexion,consulta)
}*/
}