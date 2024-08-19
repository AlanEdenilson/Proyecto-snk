const modall = document.getElementById("myModall");
const btnn = document.getElementById("openModall");
const spann = document.getElementsByClassName("closee")[0];
const cancelBtnn = document.getElementById("cancelBtnn");



btnn.onclick = function() {
    modall.style.display = "block";
}

spann.onclick = function() {
    modall.style.display = "none";
}

cancelBtnn.onclick = function() {
    modall.style.display = "none";
}



window.onclick = function(event) {
    if (event.target == modall) {
        modall.style.display = "none";
    }
}

// boton de registro

//const modal1 = document.getElementById("myModal1");
//const btn1 = document.getElementById("openModal1");
const span1 = document.getElementsByClassName("close1")[0];
const cancelBt1 = document.getElementById("cancelBtn1");


btn1.onclick = function() {
    modal1.style.display = "block";
}

span1.onclick = function() {
    modal1.style.display = "none";
}

cancelBtn1.onclick = function() {
    modal1.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modall) {
        modall.style.display = "none";
    }
}



