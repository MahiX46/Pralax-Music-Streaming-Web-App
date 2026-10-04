// ==========================================
// PRALAX LIKED SONGS LIBRARY
// ==========================================

const LIBRARY_API_URL = "http://localhost:3000";


// ==========================================
// LOAD ALL SONGS
// ==========================================

async function loadLibrary() {

    try {

        const response =
            await fetch(`${LIBRARY_API_URL}/api/songs`);

        if (!response.ok) {
            throw new Error("Unable to load songs");
        }

        const data = await response.json();

        // songs comes from player.js
        songs = data;

        displayLikedSongs();

    }

    catch (error) {

        console.error(
            "Library Error:",
            error
        );

        const container =
            document.getElementById("likedSongsList");

        if (container) {

            container.innerHTML =
                "<p>Unable to connect to Pralax backend.</p>";

        }

    }

}


// ==========================================
// GET LIKED SONGS
// ==========================================

function getLikedSongs() {

    const stored =
        localStorage.getItem("pralaxLikedSongs");

    if (!stored) {
        return [];
    }

    try {

        return JSON.parse(stored);

    }

    catch (error) {

        return [];

    }

}


// ==========================================
// SAVE LIKED SONGS
// ==========================================

function saveLikedSongs(likedSongs) {

    localStorage.setItem(
        "pralaxLikedSongs",
        JSON.stringify(likedSongs)
    );

}


// ==========================================
// SONG IDENTIFIER
// ==========================================

function getSongId(song) {

    return song.audio ||
           song.filename ||
           song.title;

}


// ==========================================
// DISPLAY LIKED SONGS
// ==========================================

function displayLikedSongs() {

    const container =
        document.getElementById("likedSongsList");

    const count =
        document.getElementById("likedCount");

    if (!container) return;


    const likedIds =
        getLikedSongs();


    const likedSongs =
        songs.filter(function (song) {

            return likedIds.includes(
                getSongId(song)
            );

        });


    // ==========================================
    // SONG COUNT
    // ==========================================

    if (count) {

        count.textContent =
            likedSongs.length === 1
                ? "1 song"
                : likedSongs.length + " songs";

    }


    // ==========================================
    // EMPTY LIBRARY
    // ==========================================

    if (likedSongs.length === 0) {

        container.innerHTML = `

            <div class="empty-library">

                <div class="empty-heart">
                    ♡
                </div>

                <h2>No liked songs yet</h2>

                <p>
                    Songs you like will appear here.
                </p>

                <a href="index.html">
                    Discover Music
                </a>

            </div>

        `;

        return;

    }


    // ==========================================
    // DISPLAY LIKED SONGS
    // ==========================================

    container.innerHTML = "";


    likedSongs.forEach(
        function (song) {


            // FIND REAL SONG INDEX

            const actualIndex =
                songs.findIndex(
                    function (item) {

                        return getSongId(item) ===
                               getSongId(song);

                    }
                );


            // SONG ROW

            const item =
                document.createElement("div");

            item.className =
                "song-item library-song-item";


            // ==========================================
            // SONG NUMBER
            // ==========================================

            const number =
                document.createElement("div");

            number.className =
                "song-number";

            number.textContent =
                actualIndex + 1;


            // ==========================================
            // SONG COVER
            // ==========================================

            const image =
                document.createElement("img");

            image.className =
                "song-cover";

            image.src =
                song.cover;

            image.alt =
                song.title;


            image.onerror =
                function () {

                    this.onerror = null;

                    this.src =
                        "../images/logo.png";

                };


            // ==========================================
            // SONG INFORMATION
            // ==========================================

            const info =
                document.createElement("div");

            info.className =
                "song-info";


            const title =
                document.createElement("h3");

            title.textContent =
                cleanLibraryTitle(
                    song.title
                );


            const artist =
                document.createElement("p");

            artist.textContent =
                song.artist ||
                "Unknown Artist";


            info.appendChild(title);
            info.appendChild(artist);


            // ==========================================
            // REMOVE LIKE BUTTON
            // ==========================================

            const likeButton =
                document.createElement("button");

            likeButton.className =
                "library-like-button";

            likeButton.textContent =
                "♥";

            likeButton.title =
                "Remove from Liked Songs";


            likeButton.onclick =
                function (event) {

                    event.stopPropagation();

                    removeLikedSong(
                        getSongId(song)
                    );

                };


            // ==========================================
            // PLAY SONG WHEN ROW CLICKED
            // ==========================================

            item.onclick =
                function () {

                    playSong(actualIndex);

                };


            // ==========================================
            // ADD EVERYTHING TO SONG ROW
            // ==========================================

            item.appendChild(number);

            item.appendChild(image);

            item.appendChild(info);

            item.appendChild(likeButton);


            // ADD SONG TO PAGE

            container.appendChild(item);

        }
    );

}


// ==========================================
// REMOVE LIKED SONG
// ==========================================

function removeLikedSong(songId) {

    let likedSongs =
        getLikedSongs();


    likedSongs =
        likedSongs.filter(
            function (id) {

                return id !== songId;

            }
        );


    saveLikedSongs(likedSongs);


    // REFRESH LIBRARY

    displayLikedSongs();

}


// ==========================================
// CLEAN SONG TITLE
// ==========================================

function cleanLibraryTitle(title) {

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

        loadLibrary();

    }
);