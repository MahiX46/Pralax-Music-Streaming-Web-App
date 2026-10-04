const audioPlayer = document.getElementById("audioPlayer");

let songs = [];
let currentSongIndex = 0;


// ========================================
// PLAY SELECTED SONG
// ========================================

function playSong(index) {

    if (!songs || songs.length === 0) {
        console.log("No songs loaded.");
        return;
    }

    if (index < 0 || index >= songs.length) {
        return;
    }

    currentSongIndex = index;

    const song = songs[index];

    console.log("Playing:", song.title);
    console.log("Audio:", song.audio);

    // Load actual MP3 from backend
    audioPlayer.src = song.audio;

    audioPlayer.load();


    // Update song title
    const title =
        document.getElementById("playerTitle");

    if (title) {
        title.textContent = song.title;
    }


    // Update artist
    const artist =
        document.getElementById("playerArtist");

    if (artist) {
        artist.textContent = song.artist;
    }


    // Update cover
    const cover =
        document.getElementById("playerCover");

    if (cover) {

        cover.src = song.cover;

        cover.onerror = function () {

            this.onerror = null;

            this.src =
                "../images/logo.png";
        };
    }


    // Play song
    audioPlayer.play()

        .then(function () {

            const button =
                document.getElementById(
                    "playButton"
                );

            if (button) {
                button.textContent = "⏸";
            }

        })

        .catch(function (error) {

            console.error(
                "Playback error:",
                error
            );

        });
}


// ========================================
// PLAY / PAUSE
// ========================================

function togglePlay() {

    if (!songs || songs.length === 0) {

        alert("Songs are still loading.");

        return;
    }


    // No song selected yet
    if (!audioPlayer.src) {

        playSong(0);

        return;
    }


    if (audioPlayer.paused) {

        audioPlayer.play();

        document.getElementById(
            "playButton"
        ).textContent = "⏸";

    } else {

        audioPlayer.pause();

        document.getElementById(
            "playButton"
        ).textContent = "▶";

    }
}


// ========================================
// NEXT SONG
// ========================================

function nextSong() {

    if (songs.length === 0) {
        return;
    }

    currentSongIndex++;

    if (
        currentSongIndex >= songs.length
    ) {

        currentSongIndex = 0;

    }

    playSong(currentSongIndex);
}


// ========================================
// PREVIOUS SONG
// ========================================

function previousSong() {

    if (songs.length === 0) {
        return;
    }

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex =
            songs.length - 1;

    }

    playSong(currentSongIndex);
}


// ========================================
// PROGRESS BAR
// ========================================

audioPlayer.addEventListener(
    "timeupdate",
    function () {

        if (
            !audioPlayer.duration ||
            isNaN(audioPlayer.duration)
        ) {
            return;
        }


        const progress =
            (
                audioPlayer.currentTime /
                audioPlayer.duration
            ) * 100;


        const progressBar =
            document.getElementById(
                "progressBar"
            );


        if (progressBar) {

            progressBar.value =
                progress;

        }


        const currentTime =
            document.getElementById(
                "currentTime"
            );


        if (currentTime) {

            currentTime.textContent =
                formatTime(
                    audioPlayer.currentTime
                );

        }

    }
);


// ========================================
// SONG DURATION
// ========================================

audioPlayer.addEventListener(
    "loadedmetadata",
    function () {

        const duration =
            document.getElementById(
                "duration"
            );

        if (duration) {

            duration.textContent =
                formatTime(
                    audioPlayer.duration
                );

        }

    }
);


// ========================================
// AUTOMATIC NEXT SONG
// ========================================

audioPlayer.addEventListener(
    "ended",
    function () {

        nextSong();

    }
);


// ========================================
// CHANGE SONG POSITION
// ========================================

function changeProgress() {

    if (!audioPlayer.duration) {
        return;
    }

    const progressBar =
        document.getElementById(
            "progressBar"
        );


    audioPlayer.currentTime =
        (
            progressBar.value / 100
        ) *
        audioPlayer.duration;
}


// ========================================
// VOLUME
// ========================================

function changeVolume() {

    const volumeBar =
        document.getElementById(
            "volumeBar"
        );


    audioPlayer.volume =
        volumeBar.value;
}


// ========================================
// FORMAT TIME
// ========================================

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remainingSeconds =
        Math.floor(
            seconds % 60
        );


    return (
        minutes +
        ":" +
        String(
            remainingSeconds
        ).padStart(
            2,
            "0"
        )
    );
}
