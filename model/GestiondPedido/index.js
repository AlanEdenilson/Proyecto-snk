module.exports = {
    verpedidos: function(conexion,funcion){
        const sql = 'SELECT * FROM usuarios';
        conexion.query(sql,funcion)
    }

}