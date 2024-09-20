// Inicialización de IndexedDB
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

// Uso
initDB()
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
    .catch(error => console.error(error));
