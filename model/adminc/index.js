module.exports={

    insertarmarca:function(conexion,id_admin,id_imagen,imagen,datos) {
        const consulta = `INSERT INTO marca (id_admin,id_imagen,imagen,nombre,descripcion,tipo_producto) VALUES ('${id_admin}','${id_imagen}','${imagen}','${datos.nombre}','${datos.descripcion}','${datos.tipop}')`;
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
    buscarId:function (conexion,id) {
        const consulta=`SELECT * FROM marca WHERE id_marca = '${id}';`
        return new Promise((resolve,reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    if (datos.length > 0) {
                        console.log(datos)
                        console.log("id encotrado")
                        return resolve(true);
                    
                    } else {
                        console.log("id no econtrado")
                        return resolve(false)
                        
                        
                    }
                }
            });
        });
        
    },
    isertId:function(conexion,nombre,id) {
        const consulta=`UPDATE marca SET id_marca = ${id} WHERE nombre = '${nombre}';`
        return new Promise((resolve,reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    if (datos.length > 0) {
                        console.log(datos)
                        return resolve(true);
                    
                    } else {
                        return resolve(false)
                        
                        
                    }
                }                                                   
            });
        });

        
    },
    isertIdadmin:function(conexion,id,id_admin) {
        console.log("admin # "+id_admin + "##"+id)
        const consulta=`UPDATE usuario SET id_marca = ${id} WHERE id = '${id_admin}';`
        return new Promise((resolve,reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    console.log('iD de admin insertado correctamente')
                    return resolve(true)
                    
                    
                }                                                  
            });
        });

        
    },

    addproducts:function(conexion,id_marca,id_imagen,imagen,datos ) {
        const consulta=`INSERT INTO productos (id_marca,id_imagen,imagen,nombre,descripcion,precio,stock,fecha_creacion) VALUES ('${id_marca}','${id_imagen}','${imagen}','${datos.nombre}','${datos.descripcion}','${datos.precio}','${datos.stock}',NOW());`
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    console.log('producto insertado correctamente')
                    return resolve(true)
                }
            });
        });


    },
    mostar: function (conexion,marca) {
        const consulta = `SELECT * FROM productos WHERE id_marca = ${marca}`
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    if (datos.length > 0) {
                        return resolve(datos);
                    } else {
                        return resolve(false)
                    }
                }
            });
        });
    },

    mostarparad: function (conexion,id) {
        const consulta = `SELECT imagen FROM productos WHERE id = ${id}`
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    if (datos.length > 0) {
                        return resolve(datos);
                    } else {
                        return resolve(false)
                    }
                }
            });
        });
    },
    delete:function (conexion,id) {
        const consulta = `DELETE  FROM productos WHERE id = ${id}`
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                   resolve(true)
                }
            });
        });
    },

    updateproduct:function(conexion,campo,value,id) {
        const consulta=`UPDATE productos SET ${campo} = '${value}' WHERE id = ${id};`
        return new Promise((resolve,reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    console.log('actualizado correcatamente')
                    return resolve(true)
                    
                    
                }                                                  
            });
        });

        
    },
    updateimagen:function(conexion,value,id) {
        console.log('imagen:'+value)
        const consulta=`UPDATE productos SET imagen = '${value}' WHERE id = ${id};`
        return new Promise((resolve,reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    console.log('actualizado correcatamente')
                    return resolve(true)
                    
                    
                }                                                  
            });
        });

        
    },
    
    


    
}