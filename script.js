let movable=false
const boule=document.getElementById("boule")
let keysPressed = {};
window.addEventListener("keydown" , (event) => {
    keysPressed[event.key] = true;
});
window.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false;
});

window.addEventListener("mousemove",(event)=>{
    if (movable){
    console.log(event.clientX,event.clientY)
    boule.style.left=(event.clientX-boule.clientWidth/2)+"px"
    boule.style.top=(event.clientY-boule.clientHeight/2)+"px"
    }
})

document.getElementById("boule").addEventListener("click",()=>{
movable=!movable
})

function moveBoule() {
    if (keysPressed["ArrowLeft"]) {
        boule.style.left = (boule.offsetLeft - 5) + "px";
    }
    if (keysPressed["ArrowRight"]) {
        boule.style.left = (boule.offsetLeft + 5) + "px";
    }
    if (keysPressed["ArrowUp"]) {
        boule.style.top = (boule.offsetTop - 5) + "px";
    }
    if (keysPressed["ArrowDown"]) {
        boule.style.top = (boule.offsetTop + 5) + "px";
    }

    requestAnimationFrame(moveBoule);
}

moveBoule();

