let movable=false
const boule=document.getElementById("boule")
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

let pressedKeys = {}
window.addEventListener("keydown",(event)=>{
    pressedKeys[event.key] = true
    upRight = pressedKeys["ArrowUp"] && pressedKeys["ArrowRight"]
    upLeft = pressedKeys["ArrowUp"] && pressedKeys["ArrowLeft"]
    downRight = pressedKeys["ArrowDown"] && pressedKeys["ArrowRight"]
    downLeft = pressedKeys["ArrowDown"] && pressedKeys["ArrowLeft"]
    numkey = Object.keys(pressedKeys).length
    if (numkey===1)
    switch(event.key){
        case "ArrowLeft": boule.style.left=(boule.offsetLeft-5)+"px";break;
        case "ArrowRight": boule.style.left=(boule.offsetLeft+5)+"px";break;
        case "ArrowUp": boule.style.top=(boule.offsetTop-5)+"px";break;
        case "ArrowDown": boule.style.top=(boule.offsetTop+5)+"px";break;
    }
    else
    switch(true){
        case upLeft: boule.style.top=(boule.offsetTop-5)+"px";boule.style.left=(boule.offsetLeft-5)+"px";break;
        case upRight: boule.style.top=(boule.offsetTop-5)+"px";boule.style.left=(boule.offsetLeft+5)+"px";break;
        case downRight: boule.style.top=(boule.offsetTop+5)+"px";boule.style.left=(boule.offsetLeft+5)+"px";break;
        case downLeft: boule.style.top=(boule.offsetTop+5)+"px";boule.style.left=(boule.offsetLeft-5)+"px";break;
    }
})
window.addEventListener("keyup",(event)=>{
    delete pressedKeys[event.key]
})