$(function() {

    $("#Produc").on('submit', function(e) {
        e.preventDefault();

        console.log('clcik')
        var form = this;
        
        var formData = new FormData(form);
        console.log(formData)


        $.ajax({
            url: '/adminr/add',
            type: 'POST',
            data: formData,
            processData: false,  // Importante cuando se usa FormData
            contentType: false,
            success: function(response) {
                
                console.log(response);
            },
            error: function(xhr, status, error) {
                
                //console.error(xhr.responseText);
                var errorMessage = xhr.responseText || 'Error desconocido';
                console.error(errorMessage);
                
            }
        })

    })
       

    
})