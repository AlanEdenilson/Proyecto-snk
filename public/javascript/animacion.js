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