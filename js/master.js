let allMusic = [
    {
        name: "Empire Ants(feat. Little Dragon)",
        artist: "Gorillaz",
        img: "music-1",
        src: "music-1"
    },
    {
        name: "Faithful",
        artist: "Common",
        img: "music-2",
        src: "music-2"
    },
    {
        name: "Loverboy",
        artist: "A-Wall",
        img: "music-3",
        src: "music-3"
    },
    {
        name: "Obstacle 2",
        artist: "Interpol",
        img: "music-4",
        src: "music-4"
    }
]
let section = document.querySelector("section")
let musicImg = document.querySelector("div img")
let mainAudio = document.querySelector('div audio')
let musicName = document.getElementById("musicName")
let musicArtist = document.getElementById("musicArtist")
let playPauseBtn = document.getElementById('playPauseBtn')
let nextSongBtn = document.getElementById('nextSongBtn')
let prevSongBtn = document.getElementById('prevSongBtn')
let musicList = document.getElementById('musicList')
let progressArea = document.getElementById("progressArea")
let progressBar = document.getElementById("progressBar")

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;
window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `music/${allMusic[indexNumb - 1].src}.mp3`;
}
let index = 1

playPauseBtn.addEventListener('click', playPause())
function playPause() {

    if (index % 2 == 0) {
        playPauseBtn.firstChild.classList.remove("fa-circle-play");
        playPauseBtn.firstChild.classList.add("fa-circle-pause");
        mainAudio.play()
    }

    else {
        playPauseBtn.firstChild.classList.remove("fa-circle-pause");
        playPauseBtn.firstChild.classList.add("fa-circle-play");
        mainAudio.pause();
    }

    index++
    console.log(index)
}

prevSongBtn.addEventListener('click', () => {
    musicIndex--
    if (musicIndex < 1) {
        musicIndex = allMusic.length
    }
    else {
        musicIndex = musicIndex
    }
    loadMusic(musicIndex)
    playPause()
})

nextSongBtn.addEventListener('click', () => {
    musicIndex++
    if (musicIndex > allMusic.length) {
        musicIndex = 1
    }
    else {
        musicIndex = musicIndex
    }
    loadMusic(musicIndex)
    playPause()
})

mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; //getting playing song currentTime
    const duration = e.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
  
    let musicCurrentTime = document.getElementById("start")
    let musicDuartion = document.getElementById("finish")
    mainAudio.addEventListener("loadeddata", ()=>{
      // update song total duration
      let mainAdDuration = mainAudio.duration;
      let totalMin = Math.floor(mainAdDuration / 60);
      let totalSec = Math.floor(mainAdDuration % 60);
      if(totalSec < 10){ //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
      }
      musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){ //if sec is less than 10 then add 0 before it
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });