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
                    throw error;
                } else {
                    if (datos.length > 0) {
                        return resolve(`El usuario " " ya existe `);
                    } else {
                        return reject(new Error('usuario no encontrado ')); // No se encontró ningún usuario
                    }
                }
            });
        });
    },

    insertarUsuario:function (conexion) {
        const consulta = `INSERT INTO usuario (usuario, contraseña) VALUES ('${usuario}', '${contraseña}')`;
        return new Promise((resolve, reject) => {
            try {
                conexion.query(consulta, function (error, datos) {
                    if (error) {
                        return reject(error);
                    } else {
                        resolve(true);
                    }
                });
                
            } catch (error) {
                throw error;
                

                
            }


           
        });
    },
    buscarmarca:function (conexion, marca) {
        const consulta = `SELECT nombre FROM marca WHERE nombre = '${marca}'`;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    return reject(error);
                } else {
                    if (datos.length > 0) {
                        resolve(true);
                    } else {
                        resolve(false); // No se encontró ningún usuario
                    }
                }
            });
        });
    },
   /* insertarmarca:function (conexion, marca) {
        const consulta = `INSERT INTO marca (nombre) VALUES ('${marca}')`;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    return reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }*/
    
    
    /*function(conexion) {
        
      
         const buscarUser = buscarUsuario(conexion,consulta)
}*/
}