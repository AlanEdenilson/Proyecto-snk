document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown-header');
    const content = document.querySelector('.dropdown-content');
    const arrow = document.querySelector('.dropdown-arrow');
  
    dropdown.addEventListener('click', function() {
      content.classList.toggle('show');
      arrow.classList.toggle('rotate');
    });
  
    // Cerrar el dropdown si se hace clic fuera de él
    window.addEventListener('click', function(event) {
      if (!dropdown.contains(event.target) && !content.contains(event.target)) {
        content.classList.remove('show');
        arrow.classList.remove('rotate');
      }
    });
  });


  const modal = document.getElementById("myModall");
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