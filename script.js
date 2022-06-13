
const myAudio = document.getElementById("myAudio");
const myVideo = document.getElementById("myVideo");

///////////////


/* let duration = myAudio.duration;
  DURATION RETURNS NaN!


 if(isNaN(duration)){
   window.location.reload();
 }
 WORKS BUT NOT CONVIENENT
*/
let duration = 245;



const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const forwardBtn = document.getElementById("forwardBtn");
const backBtn = document.getElementById("backBtn");

const discoImg = document.getElementById("discoImg");

const lineProgress = document.getElementById("lineProgress");
const lineDuration = document.getElementById("transparentLine");
const pointP = document.getElementById("pointP");

const volumeControl = document.getElementById("volumeControlOverlay");
const lineControl = document.getElementById("lineControl");
const pointV = document.getElementById("pointV");

const mainPlayer = document.getElementById("mainPlayer");
const musicInfo = document.getElementsByClassName("musicInfo");

const blackOverlay = document.getElementById("blackOverlay");

myAudio.volumeV = Math.round(lineControl.offsetWidth/154* 100) / 100;

const contentArray = [
  {nameMusic: "Take me to church", nameArtist: "Hozier", musicSource: `<source src="music/Hozier-Take-Me-To-Church-but-it-s-raining.m4a" type="audio/mpeg">`, videoSourse: ` <source src="video/production ID_3913495.mp4" type="video/mp4">`, duration:245},
  {nameMusic: "Why’d you only call me when you’re high", nameArtist:"Arctic monkeys" , musicSource: `<source src="music/arctic-monkeys-why-d-you-only-call-me-when-you-re-high-but-y.m4a" type="audio/mpeg">`, videoSourse: `<source src="video/whydyou.mp4" type="video/mp4">`, duration: 163},
  {nameMusic: "Dark Red", nameArtist: "Steve Lacy", musicSource: `<source src="music/Dark-Red-Steve-Lacy-slowed-reverb-rain.m4a" type="audio/mpeg" >`, videoSourse: `<source src="video/darkred.mp4" type="video/mp4">`, duration: 189},
  {nameMusic:"Notion",nameArtist:"The Rare Occasions", musicSource:` <source src="music/Notion-The-Rare-Occasions-RAIN.m4a" type="audio/mpeg" >`, videoSourse:`<source src="video/video.mp4" type="video/mp4">`, duration: 196},
  {nameMusic: "Sweater Weather",nameArtist: "The Neighbourhood", musicSource:` <source src="music/The-Neighbourhood-Sweater-Weather-empty-arena-rain.m4a" type="audio/mpeg" >`, videoSourse:`<source src="video/sweaterweather.mp4" type="video/mp4">`, duration:242 },
  {nameMusic:"Another Love",nameArtist: "Tom Odel", musicSource:`<source src="music/Tom-Odell-Another-Love-with-rain-sounds.m4a" type="audio/mpeg" >`, videoSourse:`<source src="video/tomodel.mp4" type="video/mp4">`, duration: 243 },
  {nameMusic:"Хочешь",nameArtist: "Земфира", musicSource:`<source src="music/земфира-хочешь-slowed-rain.m4a" type="audio/mpeg" >`, videoSourse:`<source src="video/zemfira.mp4" type="video/mp4">`, duration:223 }
];

let index = 0;

let current_rotation = 0;

let  nameMusic = document.getElementById("nameMusic");
let  nameArtist = document.getElementById("nameArtist");

let  nameMusicL = document.getElementById("nameMusicL");
let  nameArtistL = document.getElementById("nameArtistL");

let  nameMusicR = document.getElementById("nameMusicR");
let  nameArtistR = document.getElementById("nameArtistR");

  let animateDisco = null;  
  let animateProgress = null;

  let width = null;
  let widthPercent = 200/duration;


  console.log(duration);
  console.log(widthPercent);
  

playBtn.addEventListener("click", ()=> {

    playBtn.classList.add('hide');
    pauseBtn.classList.remove('hide');
    myAudio.play(); 
    animateProgress = setInterval(animatePlayerDisco, 100);
    animateDisco = setInterval(animatePlayerProgress, 1000);
    
    
    myVideo.style.opacity = '1';  
    
  }
);
function animatePlayerProgress(){
  // console.log(width);
  width += widthPercent;
  console.log(width);
  lineProgress.style.width = width+'px'; 
}
function animatePlayerDisco(){
  current_rotation += 10;
  discoImg.style.transform = 'rotate(' + current_rotation + 'deg)'; 
}

pauseBtn.addEventListener("click", (e)=> {
  clearInterval(animateDisco);   
  clearInterval(animateProgress);       
  pauseBtn.classList.add('hide');
  playBtn.classList.remove('hide');
    myAudio.pause(); 
    myVideo.style.opacity = '0';   
  }
  );
  

  myAudio.addEventListener("ended", function(){
    console.log('ended');
    updateProgressLine();
    forwardBtn.click();
  });
  function updateProgressLine(){
    pauseBtn.click();
    width = 0;
    lineProgress.style.width = 0+'px';
    pointP.style.left = 18 + 'px';
  }

  let mousedownV = false;
  let mousedownP = false;

  let mouseMoveV = false;
  let mouseMoveP = false;

  
  let rectV  = null;
  let xV = null;
  let volumeV = null;
  
  let rectP = null;
  let xP = null;
  let widthP = null;

  let widthVolume = null;
  
  

function updateVolume(e){
        rectV = e.target.getBoundingClientRect();
        xV = e.clientX - rectV.left; 
        widthVolume = xV;
        lineControl.style.width = widthVolume+'px';
        pointV.style.left = widthVolume + 49 + 'px';
  
        console.log("xV is :" + xV);
        volumeV = Math.round(xV/154* 100) / 100;
        console.log("calculation: "+Math.round(xV/154* 100) / 100);
        if(volumeV >=1){
          volumeV=1;
        } 
        if(volumeV<0){
          volumeV = 0;
        }
        console.log("volumeV is: "+volumeV);  
        myAudio.volumeV = volumeV;      
    }
    
    function updateProgressBar(e){
      rectP = e.target.getBoundingClientRect();
      xP = e.clientX - rectP.left; 
      
      widthP = xP;
      lineProgress.style.width = widthP+'px';      
      pointP.style.left = widthP + 18 + 'px';
      width = widthP;
    }
    
    volumeControl.addEventListener('mousedown', (e) => {
      mousedownV= true;  
      pointV.style.opacity = 1;  
      console.log('mousedown works');
    });

   lineDuration.addEventListener('mousedown',e=>{
     mousedownP = true;
     pointP.style.opacity = 1;
     console.log('mousedown works');
    });
 
    document.addEventListener('mouseup', (e) => {
      
      if(mousedownP){
        console.log('mouseup works ');
        if(!mouseMoveP){
          console.log('no move');
          updateProgressBar(e);
      }
      mousedownP = false;  
      mouseMoveP = false;
      pointP.style.opacity = 0; 
      myAudio.currentTime = Math.floor(duration * widthP / 200);    
      }
      
      if(mousedownV){
      console.log('mouseup works ');
      if(!mouseMoveV){
        console.log('no move');
        updateVolume(e);         
      }
      mousedownV = false;  
      mouseMoveV = false;
      pointV.style.opacity = 0; 
      }    
    });
  
  volumeControl.addEventListener('mousemove', (e) => {
    if(mousedownV){
      mouseMoveV = true;
      updateVolume(e);     
      }    
  });
 
  lineDuration.addEventListener('mousemove', (e) => {
    // console.log(Boolean(mousedownP));
    if(mousedownP){
    console.log('mousemove works');
     mouseMoveP = true;
     updateProgressBar(e);     
      }    
  });


forwardBtn.addEventListener("click", ()=> {
    blackOverlay.style.opacity = 1;
    musicInfo[0].style.opacity = 0;
    musicInfo[1].style.opacity = 0;
    musicInfo[2].style.opacity = 0;
    myVideo.style.opacity = 0;

    index !== contentArray.length-1 ?  index++ :  index =0;
    
    updatePlayers(index);
    console.log(myAudio);
    console.log(widthPercent);
    console.log(duration);
  }
  );
  backBtn.addEventListener("click", ()=> {
    blackOverlay.style.opacity = 1;
    musicInfo[0].style.opacity = 0;
    musicInfo[1].style.opacity = 0;
    musicInfo[2].style.opacity = 0;
    myVideo.style.opacity = 0;

    index !== 0 ?  index-- :  index = contentArray.length-1;
    
    updatePlayers(index);
  }
  );
  
 function updatePlayers(index){  
 
   updateProgressLine();
   myAudio.innerHTML = contentArray[index].musicSource;
   myVideo.innerHTML = contentArray[index].videoSourse;  
   duration = contentArray[index].duration;
   widthPercent = 200/duration;

 setTimeout(() => {  
   blackOverlay.style.opacity = 0;
   nameMusic.innerHTML =contentArray[index].nameMusic;
   nameArtist.innerHTML =contentArray[index].nameArtist;
   if(index === contentArray.length-1){
     nameMusicR.innerHTML =contentArray[0].nameMusic;
     nameArtistR.innerHTML =contentArray[0].nameArtist;
  
     nameMusicL.innerHTML =contentArray[index-1].nameMusic;
     nameArtistL.innerHTML =contentArray[index-1].nameArtist;
   }
   else if(index === 0){
    nameMusicL.innerHTML =contentArray[contentArray.length-1].nameMusic;
    nameArtistL.innerHTML =contentArray[contentArray.length-1].nameArtist;
  
    nameMusicR.innerHTML =contentArray[index+1].nameMusic;
    nameArtistR.innerHTML =contentArray[index+1].nameArtist;
   }
   else {
     nameMusicL.innerHTML =contentArray[index-1].nameMusic;
     nameArtistL.innerHTML =contentArray[index-1].nameArtist;
  
     nameMusicR.innerHTML =contentArray[index+1].nameMusic;
     nameArtistR.innerHTML =contentArray[index+1].nameArtist;
    }

   musicInfo[0].style.opacity = 1;    
   musicInfo[1].style.opacity = 1;
   musicInfo[2].style.opacity = 1;
 }, 400);
   
   myAudio.load();
   myVideo.load();
   playBtn.click();
 }


