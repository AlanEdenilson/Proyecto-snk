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

    
  
    return {
        PRint:renderTable,
        tt:()=>{console.log('escribiendo...')}
    }

})(jQuery)