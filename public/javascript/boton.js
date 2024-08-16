const modall = document.getElementById("myModall");
const btnn = document.getElementById("openModall");
const spann = document.getElementsByClassName("closee")[0];
const cancelBtnn = document.getElementById("cancelBtnn");
const acceptBtnn = document.getElementById("acceptBtnn");

btnn.onclick = function() {
    modall.style.display = "block";
}

spann.onclick = function() {
    modall.style.display = "none";
}

cancelBtnn.onclick = function() {
    modall.style.display = "none";
}

acceptBtnn.onclick = function() {
    alert("Acción aceptada");
    modall.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modall) {
        modall.style.display = "none";
    }
}