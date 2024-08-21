<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    $(document).ready(function() {
            $('#Produc').on('submit', function(e) {
                let hasErrors = false;
                
                // Validar producto
                const producto = $('#producto').val().trim();

                if (producto === '') {
                $('#productoError').text('El nombre de producto es requerido');
                hasErrors = true;
                } else if (producto.length < 3) {
                $('#productoError').text('El nombre debe tener al menos 3 caracteres');
                hasErrors = true;
                } else {
                $('#productoError').text('');
                }
                
                
                // Validar email
                if ($('#usuario').val().trim() === '') {
                    $('#usuarioError').text('El usuario es requerido');
                    hasErrors = true;
                } else {
                    $('#usuarioError').text('');
                }

                // Validar contraseña
                if ($('#password').val().trim() === '') {
                    $('#passwordError').text('La contraseña es requerido');
                    hasErrors = true;
                } else {
                    $('#passwordError').text('');
                }



                
                // Si hay errores, prevenir el envío del formulario
                if (hasErrors) {
                    e.preventDefault();
                }
            });
    
            // Quitar el borde rojo cuando el input obtiene el foco
            $('#producto').on('input', function() {
                $('#productoError').empty()
            });
            $('#usuario').on('input', function() {
                $('#usuarioError').empty()
            });
            $('#password').on('input', function() {
                $('#passwordError').empty()
            });
    
            // Volver a validar cuando el input pierde el foco
            $('input').on('blur', function() {
                if ($(this).val().trim() === '') {
                    $(this).addClass('input-error');
                    $('#' + this.id + 'Error').text('Este campo es requerido');
                } else {
                    $(this).removeClass('input-error');
                    $('#' + this.id + 'Error').text('');
                }
            });
        });