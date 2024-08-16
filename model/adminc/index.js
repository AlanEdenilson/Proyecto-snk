module.exports={

    insertarmarca:function(conexion,id_admin,imagen,datos) {
        const consulta = `INSERT INTO marca (id_admin,imagen,nombre,descripcion,tipo_producto,id_marca) VALUES ('${datos.rol}','${datos.username}','${datos.email}','${datos.password}','${datos.Id}')`;
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
                        return resolve(true);
                    
                    } else {
                        return reject("id_mo encontrado")
                    }
                }
            });
        });
        
    },
    isertId:function(conexion,nombre,id) {
        
    }


    
}