$(document).ready( async function() {
    $('.btn-editar').on('click', function() {
        $('.checkbox-center').css('display', 'block');
        // Cambiar todos los select de repartidor a label
        $('label[id="repartidor"]').each(function() {
            var $repartidor = $(this);
            var textoRepartidor = $repartidor.text();
            var $labelRepartidor = $('<select>', {
                id: 'repartidor'
            });
            $labelRepartidor.append($('<option>', {
                value: textoRepartidor,
                text: textoRepartidor
            }));
            $labelRepartidor.append($('<option>', {
                value: 'opcion1',
                text: 'Texto opción 1'
            }));
            $labelRepartidor.append($('<option>', {
                value: 'opcion2',
                text: 'Texto opción 2'
            }));
            $labelRepartidor.append($('<option>', {
                value: 'opcion3',
                text: 'Texto opción 3'
            }));
            $repartidor.replaceWith($labelRepartidor);
        });

        // Cambiar todos los input de fecha a label
        $('label[id="fecha"]').each(function() {
            var $fecha = $(this);
            var textoFecha = $fecha.text();
            console.log(textoFecha);
            var $labelFecha = $('<input>', {
                id: 'fecha',
                type: 'date',
                name: 'fecha',
                value: textoFecha
            });
            $fecha.replaceWith($labelFecha);
        });
    });

    //
    $('.btn-salir-editar').on('click', function() {
        $('.checkbox-center').css('display', 'none');
        // Cambiar todos los select de repartidor a label
        $('select[id="repartidor"]').each(function() {
            var $repartidor = $(this);
            var textoRepartidor = $repartidor.find('option:selected').text();
            var $labelRepartidor = $('<label>', {
                id: 'repartidor',
                text: textoRepartidor
            });
            $repartidor.replaceWith($labelRepartidor);
        });

        // Cambiar todos los input de fecha a label
        $('input[id="fecha"]').each(function() {
            var $fecha = $(this);
            var textoFecha = $fecha.val();
            
            var $labelFecha = $('<label>', {
                id: 'fecha',
                text: textoFecha
            });
            $fecha.replaceWith($labelFecha);
        });
    });
    // codigo restante para guardar datos en la bd 



    // Configuración inicial de Redux
const initialState = {
    tableData: [], // Datos actuales
    originalData: [], // Datos originales sin modificar
    isEdited: false // Flag para saber si hay cambios
};

// Acciones
const actions = {
    SET_DATA: 'SET_DATA',
    UPDATE_ROW: 'UPDATE_ROW',
    REVERT_CHANGES: 'REVERT_CHANGES'
};

// Reducer
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_DATA:
            return {
                ...state,
                tableData: action.payload,
                originalData: [...action.payload], // Guardamos una copia de los datos originales
                isEdited: false
            };
        case actions.UPDATE_ROW:
            const newTableData = state.tableData.map(row => 
                row.id === action.payload.id ? {...row, ...action.payload.changes} : row
            );
            return {
                ...state,
                tableData: newTableData,
                isEdited: true
            };
        case actions.REVERT_CHANGES:
            return {
                ...state,
                tableData: [...state.originalData],
                isEdited: false
            };
        default:
            return state;
    }
}
const store = Redux.createStore(rootReducer);


function renderTable(data) {
    const $tableBody = $('#dataTable tbody');
    $tableBody.empty();
    
    data.forEach(item => {
        const $tr = $(`
            <tr id="${item.id}" data-id="${item.id}">
               <td class="estado-icon" data-estado="${item.estado}"><i class="fas fa-exclamation-circle" style="color:blue;"></i></td>
               <td>${item.fecha_hora_pedido}</td>
               <td>${item.total_cantidad}</td>
               <td>$ ${item.total_pedido}</td>
               <td id="select">
                   <label id='repartidor'>${item.nombre_repartidor===null ?'no asigando': item.nombre_repartidor}</label> <!-- Cambié 'marta1' por 'item.repartidorn' -->
               </td>
               <td id="fechatd">
                   <label type="date" id="fecha" name="fecha">${item.fecha_entrega===null ? '00/00/00':item.fecha_entrega}</label> <!-- Cambié '12/34/2024' por 'item.fecha_entrega' -->
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
    
 
        $.ajax({
            url: '/gestion/pedidosProcess', // Reemplaza con la URL de tu API
            type: 'GET',
            success: function(data) {
                 // Maneja la respuesta aquí
                console.log(data)
                store.dispatch({
                    type: actions.SET_DATA,
                    payload: data
                });
            },
            error: function(xhr, status, error) {
                console.error('Error en la petición:', error); // Maneja el error aquí
                
            }
        });
    
        store.subscribe(function() {
            const state = store.getState();
            renderTable(state.tableData);
            
            // Habilitar/deshabilitar botón de revertir cambios
     
        });
///////////////////////////////////////////////////////////////

    // try {

    //     await BD.start()
    //     console.log('base de datos iniciada' )
    //     //
       
    //     if (await BD.count() !==0 ){
    //         console.log('ya hay registros')
    //     }else{
    //         var res = await ajaxw();
    //         console.log(res);
    //         var array= res.map(item => ({
                    
    //             id: item.pedidos_ids,
    //             fecha: item.fecha_hora_pedido,
    //             repartidor: item.repartidor,
    //             repartidorn: item.nombre_repartidor,
    //             fecha_entrega: item.fecha_entrega,
    //             estado: item.estados,
    //             total: item.total_pedido,
    //             cantidad: item.total_cantidad,
    //             Aceptado: false
    //         }));
         
    //         var ss = await BD.Save(array)
    //          console.log('datos ingresados correctamente')
    //        console.log(ss);
    //     }

    // } catch (er){
    //     console.log(er)

    // }







});