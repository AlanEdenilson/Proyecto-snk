// generar con sultas 
//actualizar datos
//crear datos 
// de log-in




module.exports = {
    buscarusuario:function (conexion,username,password) {
        const consulta = `SELECT id,id_rol,usuario,correo, contraseña FROM usuario WHERE usuario = '${username}' AND contraseña ='${password}'`;
        return new Promise((resolve,reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    if (datos.length > 0) {
                        console.log(datos)
                        
                        return resolve(datos[0]);
                    } else {
                        return reject(new Error('usuario no encontrado '));
                        // No se encontró ningún usuario
                    }
                }
            });
        });
    },

    insertarUsuario:function (conexion,datos) {
        const consulta = `INSERT INTO usuario (id_rol,usuario,correo,contraseña,id_marca) VALUES ('${datos.rol}','${datos.username}','${datos.email}','${datos.password}','${datos.Id}')`;
        return new Promise((resolve, reject) => {
            try {
                conexion.query(consulta, function (error,result) {
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

    FindUser:function (conexion,username) {
        const consulta = `SELECT usuario FROM usuario WHERE usuario = '${username}'`;
        return new Promise((resolve,reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    if (datos.length > 0) {
                        console.log(datos)
                        return resolve(true);
                    } else {
                        return reject(false);// No se encontró ningún usuario
                    }
                }
            });
        });
    },
    FindByEmail:function (conexion,email) {
        const consulta = `SELECT correo FROM usuario WHERE correo = '${email}'`;
        return new Promise((resolve,reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    if (datos.length > 0) {
                        console.log(datos)
                        return resolve(true);
                    } else {
                        return reject(false);// No se encontró ningún usuario
                    }
                }
            });
        });
        
    },

    updatepassword:function (conexion,correo,password) {
        const consulta = `UPDATE usuario SET contraseña = '${password}' WHERE correo = '${correo}'`;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error,datos) {
                if (error) {
                    console.log("actualizasion de contraseña fallida ...")
                    return reject(error);

                } else {
                    resolve(true);
                    console.log("actualizado correctamente.....")
                }
            });
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