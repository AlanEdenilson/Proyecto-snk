module.exports={

    insertarmarca:function(conexion,id_admin,imagen,datos) {
        const consulta = `INSERT INTO marca (id_admin,imagen,nombre,descripcion,tipo_producto) VALUES ('${id_admin}','${imagen}','${datos.nombre}','${datos.descripcion}','${datos.tipop}')`;
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

    addproducts:function(conexion,id_marca,imagen,datos ) {
        const consulta=`INSERT INTO productos (id_marca	,imagen	,nombre,descripcion	,precio	) VALUES ('${id_marca}', '${imagen}', '${nombre}', '${descripcion}','${precio});`
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


    }
    


    
}