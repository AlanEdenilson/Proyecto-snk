module.exports={
    vermarcas:function(conexion,id) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
            m.imagen,
            m.nombre
            FROM marcas m
            JOIN repartidores r ON m.id = r.marca_id
            WHERE r.marca_id = 4 AND r.id = ${id}`;
        
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
    },

    verpedido:function(conexion, id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    m.id AS marca_id,
                    c.nombre,
                    pa.estado_vendedor,
                    t.imagen AS tienda_imagen,
                    t.nombre AS tienda_nombre,
                    GROUP_CONCAT(DISTINCT pa.estado) AS estados,
                    DATE_FORMAT(pa.fecha_pedido, '%Y-%m-%d %H:%i:%s') AS fecha_hora_pedido,
                    GROUP_CONCAT(DISTINCT pa.id) AS pedidos_ids,
                    pa.repartidor_id,
                    DATE_FORMAT(pa.fecha_estimada_entrega, '%Y-%m-%d %H:%i:%s') AS fecha_entrega,
                    SUM(dp.subtotal) AS total_pedido,
                    GROUP_CONCAT(DISTINCT CONCAT(
                        'producto_id:', dp.producto_id, 
                        ',precio:', dp.precio_unitario, 
                        ',cantidad:', dp.cantidad,
                        ',imagen:', p.imagen,
                        ',nombre:', p.nombre
                    ) SEPARATOR '||') AS detalles_productos,
                    SUM(dp.cantidad) AS total_cantidad,
                    pa.id AS pedido_id  -- Se agrega el id de los pedidos activos
                FROM 
                    marcas m
                JOIN productos p ON m.id = p.marca_id
                JOIN detalles_pedido dp ON p.id = dp.producto_id
                JOIN pedidos_activos pa ON dp.pedido_id = pa.id
                JOIN tiendas t ON pa.tienda_id = t.id
                JOIN clientes c ON pa.cliente_id = c.id
                WHERE 
                    pa.repartidor_id = ${id}
                GROUP BY 
                    m.nombre, fecha_hora_pedido DESC;
            `;
            conexion.query(sql, (error, results) => {
                if (error) {
                    return reject(error);
                }else if(results.length > 0){
                    return resolve(results);
                }else{
                    return resolve('no hay datos')
                }
            });
        });
    },
    actualizarEstadoPedido: function(conexion, idPedido, nuevoEstado) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE pedidos_activos 
                SET estado_vendedor = ? 
                WHERE id = ${idPedido}
            `;
            conexion.query(sql, [nuevoEstado], (error, results) => {
                if (error) {
                    return reject(error);
                } else if (results.affectedRows > 0) {
                    return resolve('Estado de vendedor actualizado con éxito');
                } else {
                    return resolve('No se encontró el pedido');
                }
            });
        });
    },
}