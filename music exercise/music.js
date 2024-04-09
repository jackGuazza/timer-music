const playPauseButton = document.getElementById('play-pause-button');
playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; 
const description = document.getElementById('description');
const volumeIcon = document.getElementById('volume-icon');
const volumeBar = document.querySelector('.volume-bar');

let isPlaying = false; 
let isMuted = false;
let prevVolume = 100; 

const songTitles = ["Killing in the Name", "Big Poppa", "Jamming"];
const albumCovers = ["https://upload.wikimedia.org/wikipedia/it/f/ff/KillingInTheName.jpg", "https://cdn.themedizine.com/2015/03/throwbackthursday-notoriousbig-big-poppa.jpg", "https://i.ytimg.com/vi/_Mnohr5JYaI/maxresdefault.jpg"];
const backgroundColors = ["linear-gradient(45deg, black, violet)", "linear-gradient(45deg, orange, blue)", "linear-gradient(45deg, red, green)"];

let currentSongIndex = 0; 

function changeSong() {
    document.getElementById('song-title').textContent = songTitles[currentSongIndex];
    if(songTitles[currentSongIndex]=='Killing in the Name') {
        document.getElementById('description').textContent = '" Killing in the Name "is a song by American rock band Rage Against the Machine, released on November 2, 1992 as the first single from their debut studio album Rage Against the Machine On 31 August 1993, the single was reissued in Europe and Australia with the addition of the previously unreleased "Darkness of Greed" and "Clear the Lane". In 2021, Rolling Stone magazine ranked the track number 207 on its list of the 500 greatest songs of all time.';
    } else if(songTitles[currentSongIndex]=='Big Poppa') {
        document.getElementById('description').textContent = '" Big Poppa "is the second single by American rapper The Notorious B.I.G. from Ready to Die and produced by Poke and Sean Combs. The single peaked at number six on the U.S. charts. The single received a Grammy Award nomination for Best Rap Solo Performance in 1996, which Coolio won with "Gangsta s Paradise". The single was certified platinum by the RIAA and sold over 1,000,000 copies domestically.';
    } else if(songTitles[currentSongIndex]=='Jamming') {
        document.getElementById('description').textContent = '"Jamming" is a song by the reggae band Bob Marley and the Wailers from their 1977 album Exodus. The song also appears on the compilation album Legend. The song was re-released 10 years later as a tribute to Bob Marley and was again a hit, as in the Netherlands, where it was classified in the charts for 4 weeks. In Jamaican patois the word jamming refers to a getting together or celebration. It is still receiving moderate airplay from adult alternative stations.';
    }
    document.getElementById('songTitle').textContent=songTitles[currentSongIndex];
    document.getElementById('album-cover').style.backgroundImage = `url('${albumCovers[currentSongIndex]}')`;
    document.querySelector('.background-overlay').style.background = backgroundColors[currentSongIndex];
}

changeSong();

document.querySelector('.prev-track').addEventListener('click', function() {
    currentSongIndex = (currentSongIndex - 1 + songTitles.length) % songTitles.length; 
    changeSong();
});


document.querySelector('.next-track').addEventListener('click', function() {
    currentSongIndex = (currentSongIndex + 1) % songTitles.length; 
    changeSong();
});

playPauseButton.addEventListener('click', function() {
    if (isPlaying) {
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; 
    } else {
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; 
    }
    isPlaying = !isPlaying; 
});

volumeIcon.addEventListener('click', function() {
    if (isMuted) {
        audioElement.volume = prevVolume / 100;
        volumeBar.value = prevVolume;
        volumeIcon.src = 'https://icon-icons.com/icons2/510/PNG/512/volume-high_icon-icons.com_49962.png';
    } else {
        prevVolume = volumeBar.value;
        volumeBar.value = 0;
        volumeIcon.src = 'https://cdn.icon-icons.com/icons2/2367/PNG/512/volume_muted_icon_143479.png';
    }
    isMuted = !isMuted;
});
