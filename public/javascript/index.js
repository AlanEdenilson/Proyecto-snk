const modal = document.getElementById("myModal");
        const btn = document.getElementById("openModal");
        const span = document.getElementsByClassName("close")[0];
        const cancelBtn = document.getElementById("cancelBtn");
        const acceptBtn = document.getElementById("acceptBtn");
    
        btn.onclick = function() {
            modal.style.display = "block";
        }
    
        span.onclick = function() {
            modal.style.display = "none";
        }
    
        cancelBtn.onclick = function() {
            modal.style.display = "none";
        }
    
        acceptBtn.onclick = function() {
            alert("Acción aceptada");
            modal.style.display = "none";
        }
    
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }