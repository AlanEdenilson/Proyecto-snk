$(function() {
    console.log('ExtraerCambios.js cargado');
    
        $(document).on('click', '#boton-extraer', function() {
            console.log('Botón extraer clickeado');
            $('.overlay').show();
            $('.animacion-extraccion').show();
            setTimeout(function() {
                $('.overlay').hide();
                $('.animacion-extraccion').hide();
            }, 3000); // 3 segundos de ejemplo
        });
    
});

