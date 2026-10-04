// ==========================================
// PRALAX - MY PLAYLIST
// ==========================================

const PLAYLIST_API_URL = "http://localhost:3000";
const PLAYLIST_KEY = "pralaxPlaylist";


// ==========================================
// LOAD SONGS FROM BACKEND
// ==========================================

async function loadPlaylist() {

    try {

        const response =
            await fetch(`${PLAYLIST_API_URL}/api/songs`);


        if (!response.ok) {

            throw new Error(
                "Unable to load songs"
            );

        }


        const data =
            await response.json();


        // player.js already has global songs array
        songs = data;


        console.log(
            "Playlist songs loaded:",
            songs.length
        );


        displayPlaylistSongs();

    }

    catch (error) {

        console.error(
            "Playlist Error:",
            error
        );


        const container =
            document.getElementById(
                "playlistSongs"
            );


        if (container) {

            container.innerHTML = `

                <div class="empty-library">

                    <h2>
                        Unable to load songs
                    </h2>

                    <p>
                        Make sure the Pralax backend is running.
                    </p>

                </div>

            `;

        }

    }

}



// ==========================================
// GET PLAYLIST
// ==========================================

function getPlaylist() {

    const storedPlaylist =
        localStorage.getItem(
            PLAYLIST_KEY
        );


    if (!storedPlaylist) {

        return [];

    }


    try {

        const playlist =
            JSON.parse(
                storedPlaylist
            );


        if (Array.isArray(playlist)) {

            return playlist;

        }


        return [];

    }

    catch (error) {

        console.error(
            "Unable to read playlist:",
            error
        );


        return [];

    }

}



// ==========================================
// SAVE PLAYLIST
// ==========================================

function savePlaylist(playlist) {

    localStorage.setItem(
        PLAYLIST_KEY,
        JSON.stringify(playlist)
    );

}



// ==========================================
// GET UNIQUE SONG ID
// ==========================================

function getPlaylistSongId(song) {

    return (
        song.audio ||
        song.filename ||
        song.title
    );

}



// ==========================================
// CHECK IF SONG IS IN PLAYLIST
// ==========================================

function isSongInPlaylist(song) {

    const playlist =
        getPlaylist();


    const songId =
        getPlaylistSongId(song);


    return playlist.includes(
        songId
    );

}



// ==========================================
// ADD SONG TO PLAYLIST
// ==========================================

function addToPlaylist(song) {

    let playlist =
        getPlaylist();


    const songId =
        getPlaylistSongId(song);


    // ALREADY EXISTS

    if (playlist.includes(songId)) {

        alert(
            "This song is already in My Playlist."
        );

        return;

    }


    // ADD SONG

    playlist.push(
        songId
    );


    savePlaylist(
        playlist
    );


    console.log(
        "Song added to playlist:",
        song.title
    );


    alert(
        "Added to My Playlist 🎶"
    );


    // UPDATE PAGE IF CURRENTLY ON PLAYLIST PAGE

    if (
        document.getElementById(
            "playlistSongs"
        )
    ) {

        displayPlaylistSongs();

    }

}



// ==========================================
// REMOVE SONG FROM PLAYLIST
// ==========================================

function removeFromPlaylist(songId) {

    let playlist =
        getPlaylist();


    playlist =
        playlist.filter(
            function (id) {

                return id !== songId;

            }
        );


    savePlaylist(
        playlist
    );


    displayPlaylistSongs();

}



// ==========================================
// DISPLAY PLAYLIST SONGS
// ==========================================

function displayPlaylistSongs() {

    const container =
        document.getElementById(
            "playlistSongs"
        );


    const count =
        document.getElementById(
            "playlistCount"
        );


    if (!container) {

        return;

    }


    const playlist =
        getPlaylist();


    // GET FULL SONG INFORMATION

    const playlistSongs =
        songs.filter(
            function (song) {

                return playlist.includes(
                    getPlaylistSongId(song)
                );

            }
        );



    // ==========================================
    // UPDATE COUNT
    // ==========================================

    if (count) {

        if (playlistSongs.length === 1) {

            count.textContent =
                "1 song";

        }

        else {

            count.textContent =
                playlistSongs.length +
                " songs";

        }

    }



    // ==========================================
    // EMPTY PLAYLIST
    // ==========================================

    if (playlistSongs.length === 0) {

        container.innerHTML = `

            <div class="empty-library">

                <div class="empty-heart">
                    🎵
                </div>


                <h2>
                    Your playlist is empty
                </h2>


                <p>
                    Add songs from the Pralax homepage.
                </p>


                <a href="index.html">
                    Discover Music
                </a>

            </div>

        `;


        return;

    }



    // ==========================================
    // CLEAR OLD CONTENT
    // ==========================================

    container.innerHTML = "";



    // ==========================================
    // DISPLAY SONGS
    // ==========================================

    playlistSongs.forEach(
        function (song, playlistIndex) {


            // FIND SONG INDEX IN MAIN SONG ARRAY

            const actualIndex =
                songs.findIndex(
                    function (item) {

                        return (
                            getPlaylistSongId(item) ===
                            getPlaylistSongId(song)
                        );

                    }
                );



            // ==================================
            // SONG ROW
            // ==================================

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "song-item library-song-item";



            // ==================================
            // NUMBER
            // ==================================

            const number =
                document.createElement(
                    "div"
                );


            number.className =
                "song-number";


            number.textContent =
                playlistIndex + 1;



            // ==================================
            // COVER
            // ==================================

            const image =
                document.createElement(
                    "img"
                );


            image.className =
                "song-cover";


            image.src =
                song.cover;


            image.alt =
                song.title ||
                "Song Cover";


            image.onerror =
                function () {

                    this.onerror = null;

                    this.src =
                        "../images/logo.png";

                };



            // ==================================
            // SONG INFORMATION
            // ==================================

            const info =
                document.createElement(
                    "div"
                );


            info.className =
                "song-info";



            // TITLE

            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                cleanPlaylistTitle(
                    song.title
                );



            // ARTIST

            const artist =
                document.createElement(
                    "p"
                );


            artist.textContent =
                song.artist ||
                "Unknown Artist";



            info.appendChild(
                title
            );


            info.appendChild(
                artist
            );



            // ==================================
            // REMOVE BUTTON
            // ==================================

            const removeButton =
                document.createElement(
                    "button"
                );


            removeButton.type =
                "button";


            removeButton.className =
                "library-like-button";


            removeButton.textContent =
                "✕";


            removeButton.title =
                "Remove from My Playlist";


            removeButton.onclick =
                function (event) {

                    event.stopPropagation();


                    removeFromPlaylist(
                        getPlaylistSongId(song)
                    );

                };



            // ==================================
            // PLAY SONG
            // ==================================

            item.onclick =
                function () {

                    if (actualIndex >= 0) {

                        playSong(
                            actualIndex
                        );

                    }

                };



            // ==================================
            // BUILD SONG ROW
            // ==================================

            item.appendChild(
                number
            );


            item.appendChild(
                image
            );


            item.appendChild(
                info
            );


            item.appendChild(
                removeButton
            );


            container.appendChild(
                item
            );

        }
    );

}



// ==========================================
// CLEAN SONG TITLE
// ==========================================

function cleanPlaylistTitle(title) {

    if (!title) {

        return "Unknown Song";

    }


    return title
        .replace(
            /::\s*SenSongsMp3\.Com/gi,
            ""
        )
        .trim();

}



// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadPlaylist();

    }
);