 const BD = ( function ($){
    let db;
    const dbName = "ProcessDB";
    
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
                const objectStore = db.createObjectStore("datos", { keyPath: "fecha" });
                objectStore.createIndex("id", "id", { unique: false });
                
                
            };
        });
    }

    function guardarDatos(datos) {
        console.log('datos de la bd')
        console.log(datos)
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["datos"], "readwrite");
            const objectStore = transaction.objectStore("datos");
            
            datos.forEach(dato => {
                objectStore.put(dato);
            });
            
            transaction.oncomplete = () => resolve("Datos guardados");
            transaction.onerror = () => reject("Error al guardar datos");
        });
    }

    function contarRegistros() {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["datos"], "readonly");
            const objectStore = transaction.objectStore("datos");
            const countRequest = objectStore.count();
            
            countRequest.onerror = () => reject("Error al contar registros");
            countRequest.onsuccess = () => {
                const count = countRequest.result;
                console.log(`Número de registros en la base de datos: ${count}`);
                resolve(count);
            };
        });
    }

    function obtenerPedidos() {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["datos"], "readonly");
            const objectStore = transaction.objectStore("datos");
            const request = objectStore.getAll();
            
            request.onerror = () => reject("Error al obtener pedidos");
            request.onsuccess = () => {
                const pedidos = request.result;
                // Ordenar los pedidos por fecha
                pedidos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
                resolve(pedidos);
            };
        });
    }

    function editarCampo(id, campo, valor) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["datos"], "readwrite");
            const objectStore = transaction.objectStore("datos");
            const index = objectStore.index("id");
            const request = index.openCursor(IDBKeyRange.only(id));
            
            request.onerror = () => reject("Error al obtener el pedido para editar");
            
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    const pedido = cursor.value;
                    // Actualizar el campo específico del pedido
                    pedido[campo] = valor; // Asignar el nuevo valor al campo
                    const updateRequest = cursor.update(pedido);
                    
                    updateRequest.onsuccess = () => resolve("Campo actualizado exitosamente");
                    updateRequest.onerror = () => reject("Error al actualizar el campo");
                } else {
                    reject("Pedido no encontrado");
                }
            };
        })
    }

    function borrarRegistroPorId(id) {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(["datos"], "readwrite");
          const objectStore = transaction.objectStore("datos");
          
          // Primero, buscar el registro por el índice ID
          const index = objectStore.index("id"); // Asumiendo que has creado un índice
          const getRequest = index.getKey(id);
          
          getRequest.onsuccess = (event) => {
            if (event.target.result) {
              // Si encontramos el registro, lo borramos usando su clave principal
              const deleteRequest = objectStore.delete(event.target.result);
              
              deleteRequest.onsuccess = () => {
                resolve({
                  success: true,
                  message: `Registro con ID: ${id} ha sido borrado exitosamente`
                });
              };
              
              deleteRequest.onerror = () => {
                reject(new Error(`Error al intentar borrar el registro con ID: ${id}`));
              };
            } else {
              reject(new Error(`No se encontró ningún registro con ID: ${id}`));
            }
          };
          
          getRequest.onerror = () => {
            reject(new Error(`Error al buscar el registro con ID: ${id}`));
          };
          
          transaction.onerror = (event) => {
            reject(new Error(`Error en la transacción: ${event.target.error}`));
          };
        });
      }

      function borrarTodosLosRegistros() {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["datos"], "readwrite");
            const objectStore = transaction.objectStore("datos");
            const request = objectStore.clear();
            
            request.onerror = () => reject("Error al borrar todos los registros");
            request.onsuccess = () => {
                console.log("Todos los registros han sido borrados exitosamente");
                resolve("Todos los registros han sido borrados");
            };
        });
    }

    return{
        start:initDB,
        count:contarRegistros,
        Save:guardarDatos,
        print:obtenerPedidos,
        change:editarCampo,
        delete:borrarRegistroPorId,
        deleteAll: borrarTodosLosRegistros
    }

})(jQuery)