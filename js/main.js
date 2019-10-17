document.getElementById("start").addEventListener("click", startGame);
function startGame() {
  document.querySelector(".start-page").style.display = "none";
  document.querySelector(".game-play").style.display = "inline-block";
  var blinkTime=2000;
  var blinkMinTime=1000;

  var cloudSpeed=7;
  var cloudsMaxSpeed=2.5;

  var blinkFreq=1000;
  var blinkMaxFreq=5000;

  var cought=0;
  var $eyelids = document.querySelectorAll("span");

  for (let i = 0; i < 2; i++) {
    $eyelids[i].style.height = 15 + "%";
    setTimeout(function() {
      $eyelids[i].style.transition = "0.4s all";
    }, 1000);
  }
  //iris movement
  var $iris = document.getElementsByClassName("iris");
  var score = 0;
  var heighScore = 0;
  document.addEventListener("mouseover", moveIris);
  function moveIris() {
    let x = (event.clientX * 100) / window.innerWidth + "%";
    let y = (event.clientY * 100) / window.innerHeight + "%";

    for (let i = 0; i < 2; i++) {
      $iris[i].style.left = x;
      $iris[i].style.top = y;
    }
  }

  //Random blinking
  var closeEye = Math.random() * blinkFreq + 1000; //min of 2s and max os 7s
  //for higher levels we willl be decreasing the max
  var openEye = Math.random() * blinkTime;
  //and decreasing the time the eye spend closed
  var eyesClosed = false;
  let interval1= setInterval(blink, closeEye);

  function blink() {
    console.log("i'm working");
    for (let i = 0; i < 2; i++) {
      $eyelids[i].style.height = 100 + "%";
    }
    eyesClosed = true;
    setTimeout(function() {
      let shut = Math.random() * 15 + "%";
      for (let i = 0; i < 2; i++) {
        $eyelids[i].style.height = shut;
      }
      eyesClosed = false;
      console.log("I'm also working")
      console.log(openEye)
    }, openEye);
    closeEye = Math.random() * blinkFreq + 1000;
    openEye = Math.random() * blinkTime + 500;
  }

  //moving targets
  let interval2=setInterval(makeClouds, 3240);
  let interval3=setInterval(makeClouds, 5600);
  let interval4=setInterval(makeClouds, 1300);
  var cloudImg=["css/cloud2.png","css/pixel-cloud-3.png","css/pixel-cloud-5.png"]
  function makeClouds() {
    var $cloud = document.createElement("img");
    var direction;
    if(Math.floor(Math.random()*2)){//genrating random true and false
        $cloud.classList.add("cloudLeft");
        direction=120;
    }
    else{
        $cloud.classList.add("cloudRight");
        direction=-20; 
    }
    $cloud.setAttribute("src",cloudImg[Math.floor(Math.random()*3)]);
    var $body = document.querySelector("body");
    $cloud.addEventListener("click", keepScore);
    //remove on hover
    $cloud.onmouseover = keepScore;
    //
    $cloud.style.top = Math.random() * 70 + "%";

    $body.appendChild($cloud);
    setTimeout(function() {
        $cloud.style.transition=cloudSpeed+"s all";
      $cloud.style.left = direction+ "%";//go off the scree to the other side
    }, 100);
    setTimeout(function() {
        $cloud.remove();
    }, cloudSpeed*1000+100); //=time until move+ transition time
  }

  //score keeping
  var $score = document.querySelector(".score");
  function keepScore() {
    if (!eyesClosed && cought>=3) {
      if (score > heighScore) {
        heighScore = score;
      }
      redEyes();
    } else if(!eyesClosed && cought<=2){
      cought++;
      document.querySelector(".caught").innerText = cought;
      this.remove();
    }
    else {
      score++;
      $score.innerText = score;
      this.remove();
      if(blinkFreq<blinkMaxFreq){//if we hav not reached the minimum blinking frequency yet
        blinkFreq+=250;
      }
      if(blinkTime>blinkMinTime){
        blinkTime-=100;
      }
      if(cloudSpeed>cloudsMaxSpeed){
          cloudSpeed-=0.2;
      }

    }
  }

  //user lost
  function redEyes() {
    document.removeEventListener("mouseover", moveIris);

    for (let i = 0; i < 2; i++) {
      $iris[i].style.left = 50 + "%";
      $iris[i].style.top = 50 + "%";
      $iris[i].style.background = "red";
      $iris[i].style.border = "40px solid black";
    }
    clearInterval(interval1);
    clearInterval(interval2);
    clearInterval(interval3);
    clearInterval(interval4);

    setTimeout(function(){
      Swal.fire('You lost! The sky caught you steeling too many clouds');
    },1000);
    

    // youLose();
  }

  // function youLose(){
  //     document.querySelector(".you-lost").style.display="block";
  // }
  
}
