$(function() {



    function cargarDatos(){
        
    }
    



        $.ajax({
            url: "/gestion/verpedidos",
            type: "GET",
            success: function(response) {
                console.log(response);
                var arrayRecuperado = response;
               
                let filas = '';
        arrayRecuperado.forEach(function(item) {
            filas += `
                <tr id="${item.pedidos_ids}" data-id="${item.pedidos_ids}">
                    <td class="estado-icon " data-estado="${item.estados}"><i class="fas fa-exclamation-circle "style="color:blue;"></i></td>
                    <td class="ver"><i class="fas fa-eye-slash"></i></td>
                    <td>${item.fecha_hora_pedido}</td>

                    <td> ${item.total_cantidad}</td>
                    <td> $ ${item.total_pedido}</td>
                    <td>
                    
                        <select id='repartidor'>
                             <option id='text' value="">Seleccione un repartidor</option>
                        </select>
                    </td>
                    <td>
                         <input type="date" id="fecha" name="fecha">
                    </td>
                    <td class="checkbox-center">
                        <input type="checkbox" ${item['.'] ? 'checked' : ''}>
                    </td>
                    <td><button class="detalles-btn">≫</button></td>
                </tr>
            `;
        });

                // Insertar las filas en la tabla
                $('#tabla-container tbody').html(filas);

            },
            error: function(xhr, status, error) {
                console.error("Error al cargar el contenido:", error);
            }
        });
});