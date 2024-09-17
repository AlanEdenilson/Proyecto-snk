module.exports = {
    verpedidos: function(conexion,funcion){
        const sql = 'SELECT * FROM pedidos';
        conexion.query(sql,funcion)
    }

}