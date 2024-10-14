

module.exports = {
    verpedidos: function (conexion,marca, funcion) {
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
                pa.repartidor_id AS repartidor,
                DATE_FORMAT(pa.fecha_estimada_entrega, '%Y-%m-%d %H:%i:%s') AS fecha_entrega,
            
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
                m.id = ${marca} AND pa.estado = 'En_espera' || pa.estado = ''
            GROUP BY 

                m.nombre, fecha_hora_pedido DESC;
     `;
        conexion.query(sql, funcion)
    },
    detalles: function (conexion, id, funcion) {
        // Convertir el id a un entero y almacenarlo en una variable
        // Modificamos la consulta SQL para manejar múltiples IDs
        const sql = `
            SELECT 
                c.nombre AS cliente_nombre,
                u.usuario AS repartidor_nombre,
                pa.repartidor_id,
                c.apellido AS cliente_apellido,
                t.imagen AS tienda_imagen,
                t.nombre AS tienda_nombre,
                p.id AS producto_id, 
                p.imagen AS producto_imagen,
                p.precio AS producto_precio,
                p.nombre AS producto_nombre, 
                SUM(dp.cantidad) AS cantidad_total, 
                dp.precio_unitario, 
                SUM(dp.subtotal) AS subtotal_total, 
                pa.id,
                DATE_FORMAT(pa.fecha_pedido, '%Y-%m-%d %H:%i:%s') AS fecha,
                pa.estado 
            FROM 
                productos p
                LEFT JOIN detalles_pedido dp ON p.id = dp.producto_id 
                LEFT JOIN pedidos_activos pa ON dp.pedido_id = pa.id 
                LEFT JOIN tiendas t ON pa.tienda_id = t.id
                LEFT JOIN clientes c ON pa.cliente_id = c.id
                LEFT JOIN marcas m ON p.marca_id = m.id 
                LEFT JOIN usuarios u ON pa.repartidor_id = u.id
            WHERE 
                pa.id IN (?)
            GROUP BY 
                p.id,pa.id, pa.estado 
            ORDER BY 
                pa.id, p.nombre
        `;

        // Explicación del error y la solución:
        // El error se producía porque la consulta original estaba diseñada para un solo ID,
        // pero estábamos intentando pasar múltiples IDs. Para solucionarlo, hemos hecho lo siguiente:
        // 1. Cambiamos 'pa.id = ?' a 'pa.id IN (?)' para permitir múltiples IDs.
        // 2. Agregamos 'pa.id' al GROUP BY para asegurar que los resultados se agrupen correctamente por cada pedido.
        // 3. Modificamos el ORDER BY para ordenar primero por 'pa.id' y luego por 'p.nombre'.
        // Estas modificaciones permiten que la consulta maneje múltiples IDs de pedido a la vez,
        // devolviendo los resultados correctamente agrupados y ordenados para cada pedido.

        conexion.query(sql, [id], funcion)
    },

    verpedidosnuevos: function (conexion,marca, ultimoIdLocal, funcion) {
        const sql = `
            SELECT 

                m.id AS marca_id,
                r.usuario AS repartidor_nombre,
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
            LEFT JOIN usuarios r ON pa.repartidor_id = r.id
            WHERE 
                m.id = ${marca}
                AND pa.id > ? AND pa.estado = 'En_espera' 
            GROUP BY 
                m.id, DATE_FORMAT(pa.fecha_pedido, '%Y-%m-%d %H:%i:%s')
            ORDER BY 
                m.nombre, fecha_hora_pedido DESC;
            `;

        conexion.query(sql, [ultimoIdLocal], funcion);
    },
    // ... resto del código ...
    AplicationChange: function (conexion, datos, funcion) {
        const sql = `
            UPDATE pedidos_activos 
            SET repartidor_id = ?, 
                estado = ?, 
                fecha_estimada_entrega = ?
            WHERE id = ?
        `;
        conexion.query(sql, datos, funcion);
    },
    verRepart: function (conexion,marca, funcion, id) {
        const sql = `SELECT 
            pa.id,
            u.usuario
            FROM repartidores pa
            JOIN usuarios u ON u.id = pa.id
            WHERE pa.marca_id = ${marca}
            AND u.rol = 'repartidor'
            `;

        conexion.query(sql, funcion);
    },
    loadContent: async function (conexion,marca, funcion) {
        console.log('buscando pedidos en procesos...'+marca)
        const sql = `
        SELECT 
    m.id AS marca_id,
    u.usuario AS nombre_repartidor,
    pa.estado_vendedor,
    


    GROUP_CONCAT(DISTINCT pa.estado) AS estados,
    DATE_FORMAT(pa.fecha_pedido, '%Y-%m-%d %H:%i:%s') AS fecha_hora_pedido,
    GROUP_CONCAT(DISTINCT pa.id) AS pedidos_ids,
    pa.repartidor_id AS repartidor,
    DATE_FORMAT(pa.fecha_estimada_entrega, '%Y-%m-%d %H:%i:%s') AS fecha_entrega,

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
        JOIN usuarios u ON pa.repartidor_id = u.id

        WHERE 
            m.id = ${marca} 
        GROUP BY 

        m.nombre, fecha_hora_pedido DESC;
        `;
    conexion.query(sql, funcion)

    },

    loadContent2: async function (conexion,marca, funcion) {
        console.log('buscando pediddos entregados desde el modelo...' + marca)
        const sql = `
            SELECT 
        m.id AS marca_id,
        u.usuario AS nombre_repartidor,
        pa.estado_vendedor,
        
    

        GROUP_CONCAT(DISTINCT pa.estado) AS estados,
        DATE_FORMAT(pa.fecha_pedido, '%Y-%m-%d %H:%i:%s') AS fecha_hora_pedido,
        GROUP_CONCAT(DISTINCT pa.id) AS pedidos_ids,
        pa.repartidor_id AS repartidor,
        DATE_FORMAT(pa.fecha_estimada_entrega, '%Y-%m-%d %H:%i:%s') AS fecha_entrega,
    
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
            JOIN usuarios u ON pa.repartidor_id = u.id

            WHERE 
                m.id = ${marca} AND pa.estado_vendedor = 'entregado'
            GROUP BY 

            m.nombre, fecha_hora_pedido DESC;
            `;
        conexion.query(sql, funcion)

    },

    pedidosEnprocesos:function(conexion,marca,funcion){
        console.log('pedidos en proceso...')
            const sql = `
                SELECT 
            m.id AS marca_id,
            u.usuario AS nombre_repartidor,
            pa.estado_vendedor,
            GROUP_CONCAT(DISTINCT pa.estado) AS estados,
            DATE_FORMAT(pa.fecha_pedido, '%Y-%m-%d %H:%i:%s') AS fecha_hora_pedido,
            GROUP_CONCAT(DISTINCT pa.id) AS pedidos_ids,
            pa.repartidor_id AS repartidor,
            DATE_FORMAT(pa.fecha_estimada_entrega, '%Y-%m-%d %H:%i:%s') AS fecha_entrega,
        
            SUM(dp.subtotal) AS total_pedido,
            GROUP_CONCAT(DISTINCT CONCAT(
                'producto_id:', dp.producto_id, 
                ',precio:', dp.precio_unitario, 
                
                ',cantidad:', dp.cantidad
            ) SEPARATOR '||') AS detalles_productos,
            SUM(dp.cantidad) AS total_cantidad
            
    
            
        FROM 
            marcas m
        LEFT JOIN productos p ON m.id = p.marca_id
        LEFT JOIN detalles_pedido dp ON p.id = dp.producto_id
        LEFT JOIN pedidos_activos pa ON dp.pedido_id = pa.id
        LEFT JOIN usuarios u ON pa.repartidor_id = u.id
    
        WHERE 
            m.id = ${marca} AND pa.estado = 'en_proceso'
        GROUP BY 
    
        m.nombre, fecha_hora_pedido DESC;
         `;
            conexion.query(sql, funcion)
    
        
    },
    loadContent4: async function (conexion,marca, funcion) {
        console.log('buscando pedidos rechazaos..')
        const sql = `
            SELECT 
            m.id AS marca_id,
            u.usuario AS nombre_repartidor,
            pa.estado_vendedor,
            GROUP_CONCAT(DISTINCT pa.estado) AS estados,
            DATE_FORMAT(pa.fecha_pedido, '%Y-%m-%d %H:%i:%s') AS fecha_hora_pedido,
            GROUP_CONCAT(DISTINCT pa.id) AS pedidos_ids,
            pa.repartidor_id AS repartidor,
            DATE_FORMAT(pa.fecha_estimada_entrega, '%Y-%m-%d %H:%i:%s') AS fecha_entrega,
        
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
                JOIN usuarios u ON pa.repartidor_id = u.id

            WHERE 
                m.id = ${marca} AND pa.estado_vendedor = 'cancelado'
            GROUP BY 

            m.nombre, fecha_hora_pedido DESC;
            `;
        conexion.query(sql,funcion)

    },
borarr:function(conexion,ids) {
   const consulta =  `DELETE FROM detalles_pedido WHERE pedido_id IN (?)`
       
        return new Promise((resolve, reject) => {
                conexion.query(consulta,[ids],function (error,result) {
                    if (error) {
                        throw error;
                    } else {
                        console.log('borrado corectamente')
                        resolve(true);
                    }
                });
                
           
        });
        
    },
    borar1:function(conexion,ids) {
        const consulta =  `DELETE FROM pedidos_activos WHERE id  IN (?)`;
        return new Promise((resolve, reject) => {
                conexion.query(consulta,[ids],function (error,result) {
                    if (error) {
                        throw error;
                    } else {
                        console.log('borrado corectamente')
                        resolve(true);
                    }
                });
                
           
        });
     },
     insercancelado:function(conexion,productos) {
        const consulta = `INSERT INTO pedidos_cancelados (pedidos_ids , motivo) VALUES ?`;
        const valores = productos.map(producto => [producto.id,producto.motivo]);
        return new Promise((resolve, reject) => {
           
                conexion.query(consulta,[valores], function (error,result) {
                    if (error) {
                        throw error;
                    } else {
                        
                        resolve(result);

                    }
                });
                
        
           
        });
        
    }
}

