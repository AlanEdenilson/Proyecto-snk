module.exports = {
    verpedidos: function(conexion,funcion){
        /*
        */ 

        // El error se debe a que la cláusula WHERE está en el lugar incorrecto.
        // Debe ir antes de GROUP BY. Aquí está la consulta corregida:
        const sql = `
        SELECT 
    m.id AS marca_id,
    GROUP_CONCAT(DISTINCT pa.estado) AS estados,
    DATE_FORMAT(pa.fecha_pedido, '%Y-%m-%d %H:%i:%s') AS fecha_hora_pedido,
    GROUP_CONCAT(DISTINCT pa.id) AS pedidos_ids,
    GROUP_CONCAT(DISTINCT CONCAT(
        'repartidor:', pa.repartidor_id,
        ',fecha-entrega:', DATE_FORMAT(pa.fecha_estimada_entrega, '%Y-%m-%d %H:%i:%s')
    ) SEPARATOR '||') AS detalles_repartidor,

    SUM(dp.subtotal) AS total_pedido,
    GROUP_CONCAT(DISTINCT CONCAT(
        'producto_id:', dp.producto_id, 
        ',precio:', dp.precio_unitario, 
        ',cantidad:', dp.cantidad
    ) SEPARATOR '||') AS detalles_productos,
    SUM(dp.cantidad) AS total_cantidad
    

    
FROM 
    marcas m
JOIN productos p ON m.id = p.marca_id
JOIN detalles_pedido dp ON p.id = dp.producto_id
JOIN pedidos_activos pa ON dp.pedido_id = pa.id
WHERE 
    m.id = 4
GROUP BY 
    m.id,DATE_FORMAT(pa.fecha_pedido, '%Y-%m-%d %H:%i:%s')
ORDER BY 
    m.nombre, fecha_hora_pedido DESC;
     `;
        conexion.query(sql,funcion)
    }

}