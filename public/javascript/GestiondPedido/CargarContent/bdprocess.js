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

    return{
        start:initDB,
        count:contarRegistros,
        Save:guardarDatos
    }

})(jQuery)