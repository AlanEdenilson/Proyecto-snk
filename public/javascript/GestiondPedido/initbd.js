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
        request.onsuccess = () => resolve(request.result);
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

// Uso
/*initDB()
    .then(() => {
        // Primero, obtenemos los pedidos existentes
        return obtenerPedidos().then(pedidosExistentes => {
            // Luego, agregamos nuevos datos
            const nuevosPedidos = [
                { id: Date.now(), fecha: new Date(), detalles: "Nuevo pedido 1" },
                { id: Date.now() + 1, fecha: new Date(), detalles: "Nuevo pedido 2" }
            ];
            
            // Combinamos los pedidos existentes con los nuevos
            const todosLosPedidos = [...pedidosExistentes, ...nuevosPedidos];
            
            // Guardamos todos los pedidos
            return guardarPedidos(todosLosPedidos).then(() => {
                // Finalmente, obtenemos todos los pedidos actualizados
                return obtenerPedidos();
            });
        });
    })
    .then(pedidos => console.log(pedidos))
    .catch(error => console.error(error));*/
    
    return {
        initDB: initDB,
        guardarPedidos: guardarPedidos,
        obtenerPedidos: obtenerPedidos,
        cargarDatos: cargarDatos
    };




})(jQuery);

