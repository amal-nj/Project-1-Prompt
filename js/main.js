//iris movement
var $iris=document.getElementsByClassName("iris");
var score=0;
var heighScore=0;
document.addEventListener("mouseover", moveIris);

function moveIris(){
    let x=event.clientX*100/window.innerWidth+"%";
    let y=event.clientY*100/window.innerHeight+"%";

    for(let i=0;i<2;i++){
        $iris[i].style.left=x;
        $iris[i].style.top=y;
    }
}

//Random blinking
var closeEye=Math.random()*5000+2000;
var openEye=Math.random()*2000;
var eyesClosed=false;
var $eyelids=document.querySelectorAll("span");
setInterval(blink, closeEye);

function blink() {
    for(let i=0;i<2;i++){
        $eyelids[i].style.height=100+"%";
    }
    eyesClosed=true;
    setTimeout(function() {
        let shut=Math.random()*15+"%";
        for(let i=0;i<2;i++){
            $eyelids[i].style.height=shut;
        }
        eyesClosed=false;
      }, openEye);
      closeEye=Math.random()*5000+2000;
      openEye=Math.random()*2000+500;
}



//moving targets
setInterval(makeClouds, 3240);
setInterval(makeClouds, 5600);
setInterval(makeClouds, 1300);

function makeClouds(){
var $cloud=document.createElement("div");
$cloud.classList.add("cloud");
var $body=document.querySelector("body");
$cloud.addEventListener('click',keepScore);
//remove on hover
$cloud.onmouseover=keepScore;
//
$cloud.style.top=Math.random()*70+"%";

$body.appendChild($cloud);
    setTimeout(function() {
        $cloud.style.left=120+"%";
    },2000)
    setTimeout(function() {
        $cloud.remove();
   },6000)//=time until move+ transition time
}


//score keeping
var $score=document.querySelector(".score");
function keepScore(){
    if(!eyesClosed){
        if(score>heighScore){
            heighScore=score;
        }
        redEyes();
    }
    else{
        score++;
        $score.innerText=score;
        this.remove();


     }

}
 
//user lost
document.onclick=redEyes;
function redEyes(){
    document.removeEventListener("mouseover", moveIris);

    for(let i=0;i<2;i++){
        $iris[i].style.left=50+"%";
        $iris[i].style.top=50+"%";
        $iris[i].style.background="red";
        $iris[i].style.border="40px solid black";




    }
}