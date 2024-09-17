$(function() {
        $(".container").load("/gestion/pagina1", function(response, status, xhr) {
            if (status == "error") {
                var msg = "Lo siento, ocurrió un error: ";
                $(".container").html(msg + xhr.status + " " + xhr.statusText);
            }
        });



        $.ajax({
            url: "/gestion/verpedidos",
            type: "GET",
            success: function(response) {
                $(".container").html(response);
            },
            error: function(xhr, status, error) {
                console.error("Error al cargar el contenido:", error);
            }
        });
});