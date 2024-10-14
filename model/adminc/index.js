module.exports={

    insertarmarca:function(conexion,id_imagen,imagen,datos) {
        const consulta = `INSERT INTO marcas (id_imagen,imagen,nombre,descripcion,tipo_producto) VALUES ('${id_imagen}','${imagen}','${datos.nombre}','${datos.descripcion}','${datos.tipop}')`;
        return new Promise((resolve, reject) => {
            try {
                conexion.query(consulta, function (error,result) {
                    if (error) {
                        return reject(error);
                    } else {
                        
                        resolve(result);

                    }
                });
                
            } catch (error) {
                throw error;
            }
        });
        
    },
    infoadmin:function (conexion,marca,id) {
        const consulta =  `UPDATE administradores SET marca_id = '${marca}' WHERE id = '${id}'`;
        return new Promise((resolve, reject) => {
            try {
                conexion.query(consulta, function (error,result) {
                    if (error) {
                        return reject(error);
                    } else {
                        console.log('actualizado el admin ya tiene marca')
                        resolve(true);
                    }
                });
                
            } catch (error) {
                throw error;
                

                
            }


           
        });
    },
    buscarId:function (conexion,id) {
        const consulta=`SELECT * FROM marcas WHERE id_marca = '${id}';`
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
    isertId:function(conexion,id_p,id) {
        const consulta=`UPDATE marcas SET id_marca = ${id} WHERE id = '${id_p}';`
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
        const consulta=`INSERT INTO productos (marca_id,id_imagen,imagen,nombre,descripcion,precio,stock,fecha_creacion) VALUES ('${id_marca}','${id_imagen}','${imagen}','${datos.nombre}','${datos.descripcion}','${datos.precio}','${datos.stock}',NOW());`
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
        const consulta = `SELECT * FROM productos WHERE marca_id = ${marca}`
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                   
                    return reject(error)
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
        const consulta = `SELECT id_imagen FROM productos WHERE id = ${id}`
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
                } else if(datos.affectedRows===1) {
                    //console.log(datos)
                    return resolve(true)  
                } else{
                    reject('problemas al actualizar imagen')
                }                                                 
            });
        });

        
    },
    verify:function (conexion,id) {
        const consulta = `SELECT * FROM configuracion_dias_pedido WHERE marca_id = ${id}`
        return new Promise((resolve, reject) => {
            conexion.query(consulta, function (error, datos) {
                if (error) {
                    throw error;
                } else {
                    if (datos.length > 0) {
                        return resolve(true);
                    } else {
                        return resolve(false)
                    }
                }
            });
        });
    },

    insert:
    function (conexion,marca,datos) {
        console.log('insertando datos en la')
        const consulta = `INSERT INTO configuracion_dias_pedido (marca_id, lunes, martes, miercoles, jueves, viernes, sabado, domingo) VALUES (${marca},'${datos[0]}','${datos[1]}','${datos[2]}','${datos[3]}','${datos[4]}','${datos[5]}','${datos[6]}')`
        return new Promise((resolve, reject) => {
            conexion.query(consulta,function (error,dato) {
                if (error) {
                    throw error;
                } else {
                        return resolve('datos insertados corectamente');
                   
                }
            });
        });
    },
    updat:function (conexion,datos,id) {
        const consulta = `
        UPDATE configuracion_dias_pedido 
        SET lunes = '${datos[0]}', 
            martes = '${datos[1]}', 
            miercoles = '${datos[2]}',
            jueves = '${datos[3]}',
            viernes = '${datos[4]}',
            sabado = '${datos[5]}',
            domingo = '${datos[6]}'
        WHERE marca_id= ${id}
    `;

        return new Promise((resolve, reject) => {
            conexion.query(consulta,function (error, dato) {
                if (error) {
                    throw error;
                } else {
                    resolve('actualizado correctamente')
                }
            });
        });
    },

    imagen:function (conexion,id) {
        const consulta = `SELECT imagen FROM marcas WHERE id = ${id}`;

        return new Promise((resolve, reject) => {
            conexion.query(consulta,function (error, dato) {
                if (error) {
                    reject( error);
                } else {
                    resolve(dato[0])
                }
            });
        });
    },

    repartidor:function (conexion,id) {
        const consulta = `SELECT imagen FROM marcas WHERE id = ${id}`;

        return new Promise((resolve, reject) => {
            conexion.query(consulta,function (error, dato) {
                if (error) {
                    reject( error);
                } else {
                    resolve(dato[0])
                }
            });
        });
    },
    
    
    


    
}