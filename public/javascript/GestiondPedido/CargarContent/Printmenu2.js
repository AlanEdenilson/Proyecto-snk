var write = (function($){



    function convertDateFormat(dateString) {
        if (!dateString) {
            return ''; // O maneja el caso de error como prefieras
        }
        // Divide la cadena en fecha y hora
        const datePart = dateString.split(' ');
        console.log(datePart)
        
        // Divide la parte de la fecha
        const [year, month, day] = datePart[0].split('-');
        
        // Formatea la nueva fecha
        const formattedDate = `${year}-${month}-${day}`;
        
        return formattedDate;
      }
    
    
    function renderTable(data) {
        const $tableBody = $('#dataTable tbody');
        $tableBody.empty();
        
        data.forEach(item => {
            
            const newDate = convertDateFormat(item.fecha_entrega);
            console.log(item.fecha_entrega)
            const $tr = $(`
                <tr id="${item.id}" data-id="${item.id}">
                   <td class="estado-icon" data-estado="${item.estado}"><i class="fas fa-exclamation-circle" style="color:blue;"></i></td>
                   <td>${item.fecha}</td>
                   <td>${item.cantidad}</td>
                   <td>$ ${item.total}</td>
                   <td id="select">
                       <label id='repartidor'>${item.repartidorn===null ?'no asigando': item.repartidorn}</label> <!-- Cambié 'marta1' por 'item.repartidorn' -->
                   </td>
                   <td id="fechatd">
                       <label type="date" id="fecha" name="fecha">${newDate==='' ? '2000-01-20':newDate}</label> <!-- Cambié '12/34/2024' por 'item.fecha_entrega' -->
                   </td>
                   <td class="checkbox-center">
                        <input id='aceptado' type="checkbox" ${item.Aceptado === true ? 'checked' : ''}>
                   </td>
                   <td><button class="detalles-btn">≫</button></td>
               </tr>
               `);
               $tableBody.append($tr);
            
        });
    }
    function verificar(lista){
        return new Promise((resolve, reject) => {
            try {
                const nuevaListaFiltrada = lista
        .map(pedido => {
            return {
              ...pedido,
              estado: 'rechazado'
            };
         
        })
        

                console.log("Nueva lista con estados actualizados:", nuevaListaFiltrada);
                resolve(nuevaListaFiltrada);
            } catch (error) {
                console.error("Error al verificar y actualizar estados:", error);
                reject(error);
            }
        });

    }


    function verificar1(lista){
        return new Promise((resolve, reject) => {
            try {
                const nuevaListaFiltrada = lista
        .map(pedido => {
          
          if (pedido.repartidor !== null && pedido.Aceptado === true && pedido.fecha_entrega !== null) {
            return {
              ...pedido,
              estado: 'Activado'
            };
          }
          return null;
        })
        .filter(item => item !== null);

                console.log("Nueva lista con estados actualizados:", nuevaListaFiltrada);
                resolve(nuevaListaFiltrada);
            } catch (error) {
                console.error("Error al verificar y actualizar estados:", error);
                reject(error);
            }
        });

    }

    function PrepararRegistros(lista) {
        return new Promise((resolve, reject) => {
            try {
                const nuevaLista = lista.flatMap(pedido => {
                    const ids = pedido.id.toString().split(',').map(id => id.trim());
                    return ids.map(id => ({
                        ...pedido,
                        id: parseInt(id)
                    }));
                });
                
                console.log("Nueva lista con registros separados:", nuevaLista);
                resolve(nuevaLista);
            } catch (error) {
                console.error("Error al preparar los registros:", error);
                reject(error);
            }
        });
    
        }
    
    function extraerIds(lista) {
        return new Promise((resolve, reject) => {
            try {
                const nuevaListaIds = lista
                    .map(pedido => pedido.id)
                    .filter(id => id !== null);

                
                resolve(nuevaListaIds);
            } catch (error) {
                console.error("Error al extraer IDs:", error);
                reject(error);
            }
        });
    }

    function mandar(ids){

        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/gestion/borar',
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ ids: ids }),
                    
                success: function(response) {
                resolve(response)
                    
                },
                error: function(xhr, status, error) {
                    reject(console.error('Error al cargar la página:', error));
                }
            });
        });

        

    }






    
  
    return {
        PRint:renderTable,
        CHange:verificar,
        CHange1:verificar1,
        PRepare:PrepararRegistros,
        EXids:extraerIds,
        mandar:mandar

    // "Preparar" se dice "prepare" en inglés.

        
    }

})(jQuery)