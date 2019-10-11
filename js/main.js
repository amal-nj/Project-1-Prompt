//iris movement
var $iris=document.getElementsByClassName("iris");
document.onmousemove=function(){
    let x=event.clientX*100/window.innerWidth+"%";
    let y=event.clientY*100/window.innerHeight+"%";

    for(let i=0;i<2;i++){
        $iris[i].style.left=x;
        $iris[i].style.top=y;
    }
}

//Random blinking
var closeEye=Math.random()*5000+1000;
var openEye=Math.random()*2000;
var $eyelids=document.querySelectorAll("span");
var myVar = setInterval(blink, closeEye);

function blink() {
    console.log("blink");
    for(let i=0;i<2;i++){
        $eyelids[i].style.height=100+"%";
    }
    setTimeout(function() {
        for(let i=0;i<2;i++){
            $eyelids[i].style.height=0+"%";
        }
      }, openEye);
      closeEye=Math.random()*5000+1000;
      openEye=Math.random()*2000;
}

