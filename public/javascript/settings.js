$(function() {
    let days=[]
     $('.day').click(function() {
                $(this).toggleClass('selected');
                const currentValue = $(this).val() === 'true';
                const newValue = !currentValue;
                $(this).val(newValue);
            });




            $('.apply-btn').click(function() {
                $('.days button').each(function() {
                    // Obtener el valor del botón
                    let value = $(this).attr('value');
                    // Obtener el texto del botón (L, M, X, etc.)
                    let text = $(this).text();
                    
                    // Agregar al array como un objeto
                    days.push(
                     value === 'true'
                    );
                });

            console.log(days);
            $('.loading').css('display', 'flex');
            $('.message').hide();
            $('.exit-btn').hide();

            $.ajax({
                url: '/adminr/setting',
                method: 'PUT',
                data: {
                     days
                },
                success: function(response) {
                    console.log(response);
                    setTimeout(function() {
                        $('.loading').hide();
                            $('.message').text('Aplicado con éxito').removeClass('error').addClass('success').show();
                        $('.exit-btn').show();
                    }, 2000);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    setTimeout(function() {
                            $('.message').text('Fallo al aplicar los cambios').removeClass('success').addClass('error').show();
                        $('.exit-btn').show();
                    }, 2000);
                }
                
            })
            
              

                
            });
})