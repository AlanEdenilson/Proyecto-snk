// generar con sultas 
//actualizar datos
//crear datos 
// de log-in

module.exports = {
    buscarusuario:function(conexion) {
    
        const consulta = "SELECT * FROM usuario WHERE usuario = 'Aaron'";
        conexion.query(consulta, function (error, datos) {
            if (error) {
                throw error;
            } else {
                if (datos.length > 0) {
                    console.log("Usuario encontrado:", datos);
                } else { 
                    console.log("No se encontró ningún usuario con el nombre especificado.");

                }
            }
        });
        
    },/*termina la consulta */

    otre:function (params) {
        
    }
    
}