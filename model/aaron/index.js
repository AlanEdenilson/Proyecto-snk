module.exports={
    vermarcas:function(conexion,id) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
            m.imagen,
            m.nombre
            FROM marcas m
            JOIN repartidores r ON m.id = r.marca_id
            WHERE r.marca_id = 9 AND r.id = ${id}`;
        
        conexion.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }else if(results.length > 0){
                return resolve(results);
            }else{
                return resolve('no hay datos')
            }
            
        });
    });
    }
}