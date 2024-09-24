// generar con sultas 
//actualizar datos
//crear datos 
// de log-in




module.exports = {
    buscarusuario:function (conexion,username,password) {
        const consulta = `SELECT id,usuario,email,contrasena,rol FROM usuarios WHERE usuario = '${username}' AND contrasena ='${password}'`;
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
        const consulta = `INSERT INTO usuarios (usuario,email,contrasena,rol) VALUES ('${datos.username}','${datos.email}','${datos.password}','${datos.rol}')`;
        return new Promise((resolve, reject) => {
            try {
                conexion.query(consulta, function (error,result) {
                    if (error) {
                        return reject(error);
                    } else {
                        console.log(result)
                        resolve(result);
                    }
                });
                
            } catch (error) {
                throw error;
                

                
            }


           
        });
    },
    inforepar:function (conexion,id,marca) {
        const consulta = `INSERT INTO repartidores (id, marca_id) VALUES (${id} ,${marca})`;
        return new Promise((resolve, reject) => {
            try {
                conexion.query(consulta, function (error,result) {
                    if (error) {
                        return reject(error);
                    } else {
                        console.log('insertado correctamente')
                        resolve(true);
                    }
                });
                
            } catch (error) {
                throw error;
                

                
            }


           
        });
    },
    infoadmin:function (conexion,id) {
        const consulta = `INSERT INTO administradores (id) VALUES (${id})`;
        return new Promise((resolve, reject) => {
            try {
                conexion.query(consulta, function (error,result) {
                    if (error) {
                        return reject(error);
                    } else {
                        console.log('insertado correctamente el admin ya tiene marca')
                        resolve(true);
                    }
                });
                
            } catch (error) {
                throw error;
                

                
            }


           
        });
    },

    FindUser:function (conexion,username) {
        const consulta = `SELECT usuario FROM usuarios WHERE usuario = '${username}'`;
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
        const consulta = `SELECT email FROM usuarios WHERE email = '${email}'`;
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
        const consulta = `UPDATE usuarios SET contrasena = '${password}' WHERE email = '${correo}'`;
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
    buscarmarca:function (conexion, id) {
        
        const consulta = `
        SELECT m.id, m.id_imagen, m.imagen
        FROM marcas m
        JOIN administradores a ON m.id = a.marca_id
        WHERE a.id = ${id}
        LIMIT 1
      `;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    return reject(error);
                } else {
                    if (datos.length > 0) {
                        console.log(datos[0])
                        return resolve({respuesta:true,datos:datos[0]});
                    } else {
                        resolve(false); // No se encontró ningúna marca
                    }
                }
            });
        });
    },
    Buscar_marca:function (conexion, id) {
        console.log('buscando marca')
        
        const consulta = `SELECT id FROM marcas WHERE id_marca=${id}`;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    return reject(error);
                } else {
                    if (datos.length > 0) {
                        console.log(datos)
                        return resolve({respuesta:true,dato:datos});
                    } else {
                        resolve(false); // No se encontró ningúna marca
                    }
                }
            });
        });
    },
}