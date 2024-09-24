var Modulo1 = (function($) {
let db;
const dbName = "PedidosDB";

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        
        request.onerror = event => reject("Error al abrir la base de datos");
        
        request.onsuccess = event => {
            db = event.target.result;
            resolve(db);
        };
        
        request.onupgradeneeded = event => {
            const db = event.target.result;
            const objectStore = db.createObjectStore("pedidos", { keyPath: "id" });
            objectStore.createIndex("fecha", "fecha", { unique: false });
            objectStore.createIndex("estado", "estado", { unique: false });
            objectStore.createIndex("total", "total", { unique: false });
            objectStore.createIndex("cantidad", "cantidad", { unique: false });
        };
    });
}

function guardarPedidos(pedidos) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["pedidos"], "readwrite");
        const objectStore = transaction.objectStore("pedidos");
        
        pedidos.forEach(pedido => {
            objectStore.put(pedido);
        });
        
        transaction.oncomplete = () => resolve("Pedidos guardados");
        transaction.onerror = () => reject("Error al guardar pedidos");
    });
}

function obtenerPedidos() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["pedidos"], "readonly");
        const objectStore = transaction.objectStore("pedidos");
        const request = objectStore.getAll();
        
        request.onerror = () => reject("Error al obtener pedidos");
        request.onsuccess = () => {
            const pedidos = request.result;
            // Ordenar los pedidos por ID numéricamente
            pedidos.sort((a, b) => parseInt(a.id) - parseInt(b.id));
            resolve(pedidos);
        };
    });
}
function obtenerUltimoId() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["pedidos"], "readonly");
        const objectStore = transaction.objectStore("pedidos");
        const request = objectStore.openCursor(null, 'prev');
        
        request.onerror = () => reject("Error al obtener el último ID");
        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                // Extraer todos los números de la clave
                const numbers = cursor.key.match(/\d+/g);
                if (numbers && numbers.length > 0) {
                    // Tomar el último número y convertirlo a entero
                    const lastNumber = parseInt(numbers[numbers.length - 1], 10);
                    resolve(lastNumber);
                } else {
                    resolve(0); // Si no se encuentran números, devuelve 0
                }
            } else {
                resolve(0); // Si no hay registros, devuelve 0
            }
        };
    });
}


function contarRegistros() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["pedidos"], "readonly");
        const objectStore = transaction.objectStore("pedidos");
        const countRequest = objectStore.count();
        
        countRequest.onerror = () => reject("Error al contar registros");
        countRequest.onsuccess = () => {
            const count = countRequest.result;
            console.log(`Número de registros en la base de datos: ${count}`);
            resolve(count);
        };
    });
}

function editarCampo(id, campo, valor) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["pedidos"], "readwrite");
        const objectStore = transaction.objectStore("pedidos");
        const request = objectStore.get(id);
        
        request.onerror = () => reject("Error al obtener el pedido para editar");
        
        request.onsuccess = (event) => {
            const pedido = event.target.result;
            if (pedido) {
                // Actualizar el campo específico del pedido
                pedido[campo] = valor; // Asignar el nuevo valor al campo
                const updateRequest = objectStore.put(pedido);
                
                updateRequest.onsuccess = () => resolve("Campo actualizado exitosamente");
                updateRequest.onerror = () => reject("Error al actualizar el campo");
            } else {
                reject("Pedido no encontrado");
            }
        };
    });
}

 function borrarTodosLosRegistros() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["pedidos"], "readwrite");
        const objectStore = transaction.objectStore("pedidos");
        const request = objectStore.clear();
        
        request.onerror = () => reject("Error al borrar todos los registros");
        request.onsuccess = () => {
            console.log("Todos los registros han sido borrados exitosamente");
            resolve("Todos los registros han sido borrados");
        };
    });
}


 /// cargar datos en  el html 
 function cargarDatos(){
             

    // Inicializar la base de datos
    Modulo1.initDB()
        .then(() => {
            Modulo1.obtenerPedidos()
            .then(pedidos => {
                console.log('datos extraidos')
                
        let filas = '';
        pedidos.forEach(function(item) {
            filas += `
                <tr id="${item.id}" data-id="${item.id}">
                    <td class="estado-icon " data-estado="${item.estado}"><i class="fas fa-exclamation-circle "style="color:blue;"></i></td>
                    <td class="ver"><i class="fas fa-eye-slash"></i></td>
                    <td>${item.fecha}</td>

                    <td> ${item.cantidad}</td>
                    <td> $ ${item.total}</td>
                    <td>
                    
                        <select id='repartidor'>
                              <option id='text' value="${item.repartidor}">${item.repartidorn}</option>
                        </select>
                    </td>
                    <td>
                        <input type="date" id="fecha" name="fecha" value="${item.fecha_entrega ? new Date(item.fecha_entrega).toISOString().split('T')[0] : ''}">
                    </td>
                    <td class="checkbox-center">
                         <input id='aceptado' type="checkbox" ${item.Aceptado === true ? 'checked' : ''}>
                    </td>
                    <td><button class="detalles-btn">≫</button></td>
                </tr>
            `;
        });

        // Insertar las filas en la tabla
        $('#tabla-container tbody').html(filas);
            })
            .catch(error => {
                console.error("Error al obtener los pedidos de IndexedDB:", error);
            });
        })
        .catch(error => {
            console.error("Error al inicializar la base de datos:", error);
        });
    // Obtener los pedidos de la base de datos
    

    }
    
    function refrescarBD() {
        return new Promise((resolve, reject) => {
            console.log('Refrescando la base de datos...');
            initDB()
                .then(() => obtenerPedidos())
                .then(pedidos => {
                    console.log('Datos actualizados obtenidos');
                    actualizarTablaHTML(pedidos);
                    resolve('Base de datos refrescada exitosamente');
                })
                .catch(error => {
                    console.error("Error al refrescar la base de datos:", error);
                    reject(error);
                });
        });
    }


    function actualizarTablaHTML(pedidos) {
        
        
        let filas = '';
        for (let i = 0; i < pedidos.length; i++) {
            const item = pedidos[i];
           
            filas += `
                <tr id="${item.id}" data-id="${item.id}">
                    <td class="estado-icon " data-estado="${item.estado}"><i class="fas fa-exclamation-circle "style="color:blue;"></i></td>
                    <td class="ver"><i class="fas fa-eye-slash"></i></td>
                    <td>${item.fecha}</td>
                    <td>${item.cantidad}</td>
                    <td>$ ${item.total}</td>
                    <td>
                        <select id='repartidor'>
                             <option id='text' value="${item.repartidor}">${item.repartidorn}</option>
                        </select>
                    </td>
                    <td>
                         <input type="date" id="fecha" name="fecha" value="${item.fecha_entrega ? new Date(item.fecha_entrega).toISOString().split('T')[0] : ''}">
                    </td>
                    <td class="checkbox-center">
                        <input id='aceptado' type="checkbox" ${item.Aceptado === true ? 'checked' : ''}>
                    </td>
                    <td><button class="detalles-btn">≫</button></td>
                </tr>
            `;
        };

        $('#tabla-container tbody').html(filas);
    }

    return {
        initDB: initDB,
        guardarPedidos: guardarPedidos,
        obtenerPedidos: obtenerPedidos,
        cargarDatos: cargarDatos,
        contarRegistros: contarRegistros,
        obtenerUltimoId: obtenerUltimoId,
        refrescarBD: refrescarBD,
        editar:editarCampo,
        borrarTodosLosRegistros:borrarTodosLosRegistros
    };




})(jQuery);

