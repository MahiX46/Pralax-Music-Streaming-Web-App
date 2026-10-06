// ==========================================
// PRALAX SINGLE PAGE NAVIGATION
// Keeps the music player alive while
// Home / Search / Library / Playlist change
// ==========================================

let homePageHTML = "";


// ==========================================
// INITIALIZE SPA
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const pageContent =
        document.getElementById("pageContent");

    if (!pageContent) {
        console.error("pageContent not found.");
        return;
    }

    // Save original Home page
    homePageHTML = pageContent.innerHTML;

    setupNavigation();
});


// ==========================================
// NAVIGATION
// ==========================================

function setupNavigation() {

    document.querySelectorAll("[data-page]")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const page =
                        this.dataset.page;

                    openPralaxPage(page);
                }
            );
        });
}


// ==========================================
// OPEN PAGE
// ==========================================

function openPralaxPage(page) {

    setActiveNavigation(page);

    if (page === "home") {

        showHomePage();

    }

    else if (page === "search") {

        showSearchPage();

    }

    else if (page === "library") {

        showLikedSongsPage();

    }

    else if (page === "playlist") {

        showPlaylistPage();

    }
}


// ==========================================
// ACTIVE SIDEBAR LINK
// ==========================================

function setActiveNavigation(page) {

    document.querySelectorAll("[data-page]")
        .forEach(function (link) {

            link.classList.remove("active");

        });


    const links =
        document.querySelectorAll(
            `[data-page="${page}"]`
        );


    links.forEach(function (link) {

        link.classList.add("active");

    });
}


// ==========================================
// HOME PAGE
// ==========================================

function showHomePage() {

    const container =
        document.getElementById("pageContent");

    container.innerHTML =
        homePageHTML;


    // Rebuild Home using already loaded songs
    if (
        typeof songs !== "undefined" &&
        songs.length > 0
    ) {

        displayQuickPicks();

        displaySongs();

        displayAlbums();

        displayArtists();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// SEARCH PAGE
// ==========================================

function showSearchPage() {

    const container =
        document.getElementById("pageContent");


    container.innerHTML = `

        <section class="spa-page">

            <div class="playlist-header">

                <div>

                    <p>SEARCH</p>

                    <h1>
                        Find Your Music
                    </h1>

                    <p>
                        Search songs, artists or albums.
                    </p>

                </div>

            </div>


            <div class="spa-search-box">

                <input
                    type="text"
                    id="spaSearchInput"
                    placeholder="Search songs, artists or albums..."
                    autocomplete="off"
                >

            </div>


            <p
                id="spaSearchMessage"
                class="search-message">
                Start typing to search your music.
            </p>


            <section class="music-section">

                <div class="section-header">

                    <h2>
                        Search Results
                    </h2>

                </div>


                <div
                    id="spaSearchResults"
                    class="song-list">
                </div>

            </section>

        </section>

    `;


    const input =
        document.getElementById(
            "spaSearchInput"
        );


    input.addEventListener(
        "input",
        performSpaSearch
    );


    // Initially display all songs
    displaySpaSongs(
        songs,
        "spaSearchResults"
    );


    input.focus();
}


// ==========================================
// PERFORM SEARCH
// ==========================================

function performSpaSearch() {

    const input =
        document.getElementById(
            "spaSearchInput"
        );


    const message =
        document.getElementById(
            "spaSearchMessage"
        );


    if (!input) return;


    const query =
        input.value
            .trim()
            .toLowerCase();


    if (query === "") {

        message.textContent =
            "Start typing to search your music.";

        displaySpaSongs(
            songs,
            "spaSearchResults"
        );

        return;
    }


    const filteredSongs =
        songs.filter(
            function (song) {

                const title =
                    (
                        song.title || ""
                    ).toLowerCase();


                const artist =
                    (
                        song.artist || ""
                    ).toLowerCase();


                const album =
                    (
                        song.album || ""
                    ).toLowerCase();


                return (
                    title.includes(query) ||
                    artist.includes(query) ||
                    album.includes(query)
                );
            }
        );


    if (filteredSongs.length === 0) {

        message.textContent =
            `No results found for "${input.value}".`;

    }

    else {

        message.textContent =
            filteredSongs.length +
            " result(s) found.";

    }


    displaySpaSongs(
        filteredSongs,
        "spaSearchResults"
    );
}


// ==========================================
// LIKED SONGS PAGE
// ==========================================

function showLikedSongsPage() {

    const container =
        document.getElementById(
            "pageContent"
        );


    const likedIds =
        getLikedSongs();


    const likedSongs =
        songs.filter(
            function (song) {

                return likedIds.includes(
                    getSongId(song)
                );
            }
        );


    container.innerHTML = `

        <section class="spa-page">

            <div class="playlist-header">

                <div>

                    <p>PLAYLIST</p>

                    <h1>
                        ❤️ Liked Songs
                    </h1>

                    <p id="spaLikedCount">
                        ${likedSongs.length}
                        ${likedSongs.length === 1
                            ? "song"
                            : "songs"}
                    </p>

                </div>

            </div>


            <section class="music-section">

                <div class="section-header">

                    <h2>
                        Your Liked Songs
                    </h2>

                </div>


                <div
                    id="spaLikedSongs"
                    class="song-list">
                </div>

            </section>

        </section>

    `;


    if (likedSongs.length === 0) {

        document.getElementById(
            "spaLikedSongs"
        ).innerHTML = `

            <div class="empty-library">

                <div class="empty-heart">
                    ♡
                </div>

                <h2>
                    No liked songs yet
                </h2>

                <p>
                    Songs you like will appear here.
                </p>

                <button
                    class="spa-home-button"
                    onclick="openPralaxPage('home')">
                    Discover Music
                </button>

            </div>
        `;

        return;
    }


    displaySpaSongs(
        likedSongs,
        "spaLikedSongs",
        "liked"
    );
}


// ==========================================
// PLAYLIST PAGE
// ==========================================

function showPlaylistPage() {

    const container =
        document.getElementById(
            "pageContent"
        );


    const playlistIds =
        getPlaylist();


    const playlistSongs =
        songs.filter(
            function (song) {

                return playlistIds.includes(
                    getSongId(song)
                );
            }
        );


    container.innerHTML = `

        <section class="spa-page">

            <div class="playlist-header">

                <div>

                    <p>PLAYLIST</p>

                    <h1>
                        🎶 My Playlist
                    </h1>

                    <p>
                        ${playlistSongs.length}
                        ${playlistSongs.length === 1
                            ? "song"
                            : "songs"}
                    </p>

                </div>

            </div>


            <section class="music-section">

                <div class="section-header">

                    <h2>
                        Your Songs
                    </h2>

                </div>


                <div
                    id="spaPlaylistSongs"
                    class="song-list">
                </div>

            </section>

        </section>

    `;


    if (playlistSongs.length === 0) {

        document.getElementById(
            "spaPlaylistSongs"
        ).innerHTML = `

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

                <button
                    class="spa-home-button"
                    onclick="openPralaxPage('home')">
                    Discover Music
                </button>

            </div>
        `;

        return;
    }


    displaySpaSongs(
        playlistSongs,
        "spaPlaylistSongs",
        "playlist"
    );
}


// ==========================================
// DISPLAY SONG ROWS
// ==========================================

function displaySpaSongs(
    songArray,
    containerId,
    mode = "normal"
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) return;


    container.innerHTML = "";


    if (songArray.length === 0) {

        container.innerHTML = `

            <div class="empty-library">

                <div class="empty-heart">
                    🎵
                </div>

                <h2>
                    No songs found
                </h2>

            </div>
        `;

        return;
    }


    songArray.forEach(
        function (song, rowIndex) {


            // Find index in master songs array

            const actualIndex =
                songs.findIndex(
                    function (item) {

                        return (
                            getSongId(item) ===
                            getSongId(song)
                        );
                    }
                );


            // SONG ROW

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "song-item library-song-item";


            item.onclick =
                function () {

                    if (actualIndex >= 0) {

                        playSong(
                            actualIndex
                        );
                    }
                };


            // NUMBER

            const number =
                document.createElement(
                    "div"
                );


            number.className =
                "song-number";


            number.textContent =
                rowIndex + 1;


            // COVER

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


            // INFO

            const info =
                document.createElement(
                    "div"
                );


            info.className =
                "song-info";


            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                cleanTitle(
                    song.title
                );


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


            item.appendChild(
                number
            );


            item.appendChild(
                image
            );


            item.appendChild(
                info
            );


            // ======================================
            // LIKED PAGE REMOVE BUTTON
            // ======================================

            if (mode === "liked") {

                const removeButton =
                    document.createElement(
                        "button"
                    );


                removeButton.className =
                    "library-like-button";


                removeButton.textContent =
                    "♥";


                removeButton.title =
                    "Remove from Liked Songs";


                removeButton.onclick =
                    function (event) {

                        event.stopPropagation();


                        toggleLike(song);


                        showLikedSongsPage();
                    };


                item.appendChild(
                    removeButton
                );
            }


            // ======================================
            // PLAYLIST PAGE REMOVE BUTTON
            // ======================================

            else if (
                mode === "playlist"
            ) {

                const removeButton =
                    document.createElement(
                        "button"
                    );


                removeButton.className =
                    "library-like-button";


                removeButton.textContent =
                    "✕";


                removeButton.title =
                    "Remove from My Playlist";


                removeButton.onclick =
                    function (event) {

                        event.stopPropagation();


                        togglePlaylist(song);


                        showPlaylistPage();
                    };


                item.appendChild(
                    removeButton
                );
            }


            // ======================================
            // SEARCH PAGE BUTTONS
            // ======================================

            else {

                const likeButton =
                    document.createElement(
                        "button"
                    );


                likeButton.className =
                    "song-like-button";


                updateLikeButton(
                    likeButton,
                    song
                );


                likeButton.onclick =
                    function (event) {

                        event.stopPropagation();


                        toggleLike(song);


                        updateLikeButton(
                            likeButton,
                            song
                        );
                    };


                const playlistButton =
                    document.createElement(
                        "button"
                    );


                playlistButton.className =
                    "song-playlist-button";


                updatePlaylistButton(
                    playlistButton,
                    song
                );


                playlistButton.onclick =
                    function (event) {

                        event.stopPropagation();


                        togglePlaylist(
                            song
                        );


                        updatePlaylistButton(
                            playlistButton,
                            song
                        );
                    };


                item.appendChild(
                    likeButton
                );


                item.appendChild(
                    playlistButton
                );
            }


            container.appendChild(
                item
            );
        }
    );
}