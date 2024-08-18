$(function(){

    $.getJSON('/adminr//te53eer353r', function(data) {
        console.log(data)
        

        var jsonData = data
        
        for (var i = 0; i < jsonData.length; i++) {
            console.log(jsonData[i].imagen)
            $('.admin-table').append(`
                  <tr>
                     <td><img src="/images/${jsonData[i].imagen}" alt="Profile Picture" class="profile-pic"></td>
                     <td>${jsonData[i].nombre}</td>
                     <td>${jsonData[i].precio}</td>
                     <td>${jsonData[i].stock}</td>
                     <td>
                         <button class="btn-edit"  id="openModal1">Editar</button>
                         <button class="btn-delete" id="openModall">Borrar</button>
                     </td>
                 </tr>
                 `)

                 
    // Asegúrate de que las funciones se establecen solo una vez
    $('.admin-table').off('click', '#openModal1').on('click', '#openModal1', function() {
        $('#myModal1').css({
            'display':'block',
            })
    });

    $('.admin-table').off('click', '#openModall').on('click', '#openModall', function() {
        $('.modall').css({
            'display':'block',
            })
    });
  
 
    
 }
         
    
    })
       
            
      

       
})