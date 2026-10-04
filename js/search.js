// ==========================================
// PRALAX SEARCH
// ==========================================

const SEARCH_API_URL =
    "http://localhost:3000";


// ==========================================
// LOAD SONGS
// ==========================================

async function loadSearchSongs() {

    const results =
        document.getElementById(
            "searchResults"
        );

    try {

        const response =
            await fetch(
                `${SEARCH_API_URL}/api/songs`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load songs"
            );
        }


        const data =
            await response.json();


        // songs comes from player.js

        songs = data;


        console.log(
            "Search songs loaded:",
            songs.length
        );


        // Initially show all songs

        displaySearchResults(
            songs
        );

    }

    catch (error) {

        console.error(
            "Search Error:",
            error
        );


        if (results) {

            results.innerHTML = `

                <p>
                    Unable to connect to Pralax backend.
                </p>

            `;
        }
    }
}


// ==========================================
// SEARCH SONGS
// ==========================================

function performSearch() {

    const input =
        document.getElementById(
            "searchPageInput"
        );


    const message =
        document.getElementById(
            "searchMessage"
        );


    if (!input) return;


    const query =
        input.value
            .trim()
            .toLowerCase();


    // EMPTY SEARCH

    if (query === "") {

        if (message) {

            message.textContent =
                "Search for your favourite songs, artists or albums.";
        }


        displaySearchResults(
            songs
        );

        return;
    }


    // FILTER SONGS

    const filteredSongs =
        songs.filter(
            function (song) {

                const title =
                    (
                        song.title ||
                        ""
                    ).toLowerCase();


                const artist =
                    (
                        song.artist ||
                        ""
                    ).toLowerCase();


                const album =
                    (
                        song.album ||
                        ""
                    ).toLowerCase();


                return (
                    title.includes(query) ||
                    artist.includes(query) ||
                    album.includes(query)
                );

            }
        );


    // RESULT MESSAGE

    if (message) {

        if (
            filteredSongs.length === 0
        ) {

            message.textContent =
                `No results found for "${input.value.trim()}".`;

        }

        else {

            message.textContent =
                `${filteredSongs.length} result(s) found.`;

        }
    }


    displaySearchResults(
        filteredSongs
    );
}


// ==========================================
// DISPLAY SEARCH RESULTS
// ==========================================

function displaySearchResults(
    resultSongs
) {

    const container =
        document.getElementById(
            "searchResults"
        );


    if (!container) return;


    container.innerHTML = "";


    // NO RESULTS

    if (
        resultSongs.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-library">

                <div class="empty-heart">
                    🔍
                </div>

                <h2>No songs found</h2>

                <p>
                    Try another song, artist or album.
                </p>

            </div>

        `;

        return;
    }


    // DISPLAY SONGS

    resultSongs.forEach(
        function (song) {


            // Get actual song index
            // so player.js can play it.

            const actualIndex =
                songs.findIndex(
                    function (item) {

                        return (
                            getSearchSongId(item) ===
                            getSearchSongId(song)
                        );

                    }
                );


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "song-item";


            // PLAY SONG

            item.onclick =
                function () {

                    if (
                        actualIndex >= 0
                    ) {

                        playSong(
                            actualIndex
                        );
                    }
                };


            // ==========================================
            // NUMBER
            // ==========================================

            const number =
                document.createElement(
                    "div"
                );


            number.className =
                "song-number";


            number.textContent =
                actualIndex + 1;


            // ==========================================
            // COVER
            // ==========================================

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


            // ==========================================
            // SONG INFORMATION
            // ==========================================

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
                cleanSearchTitle(
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


            // ==========================================
            // LIKE BUTTON
            // ==========================================

            const likeButton =
                document.createElement(
                    "button"
                );


            likeButton.className =
                "song-like-button";


            updateSearchLikeButton(
                likeButton,
                song
            );


            likeButton.onclick =
                function (event) {

                    event.stopPropagation();

                    toggleSearchLike(
                        song
                    );

                    updateSearchLikeButton(
                        likeButton,
                        song
                    );
                };


            // ==========================================
            // PLAYLIST BUTTON
            // ==========================================

            const playlistButton =
                document.createElement(
                    "button"
                );


            playlistButton.className =
                "song-playlist-button";


            updateSearchPlaylistButton(
                playlistButton,
                song
            );


            playlistButton.onclick =
                function (event) {

                    event.stopPropagation();

                    toggleSearchPlaylist(
                        song
                    );

                    updateSearchPlaylistButton(
                        playlistButton,
                        song
                    );
                };


            // ==========================================
            // ADD TO ROW
            // ==========================================

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
                likeButton
            );

            item.appendChild(
                playlistButton
            );


            container.appendChild(
                item
            );

        }
    );
}


// ==========================================
// SONG ID
// ==========================================

function getSearchSongId(song) {

    return (
        song.audio ||
        song.filename ||
        song.title
    );
}


// ==========================================
// CLEAN TITLE
// ==========================================

function cleanSearchTitle(title) {

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
// LIKED SONGS
// ==========================================

function getSearchLikedSongs() {

    const stored =
        localStorage.getItem(
            "pralaxLikedSongs"
        );


    if (!stored) {

        return [];
    }


    try {

        const data =
            JSON.parse(stored);


        return Array.isArray(data)
            ? data
            : [];

    }

    catch (error) {

        return [];
    }
}


// ==========================================
// LIKE / UNLIKE
// ==========================================

function toggleSearchLike(song) {

    let likedSongs =
        getSearchLikedSongs();


    const songId =
        getSearchSongId(song);


    if (
        likedSongs.includes(
            songId
        )
    ) {

        likedSongs =
            likedSongs.filter(
                function (id) {

                    return (
                        id !== songId
                    );

                }
            );

    }

    else {

        likedSongs.push(
            songId
        );

    }


    localStorage.setItem(
        "pralaxLikedSongs",
        JSON.stringify(
            likedSongs
        )
    );
}


// ==========================================
// LIKE BUTTON DISPLAY
// ==========================================

function updateSearchLikeButton(
    button,
    song
) {

    const likedSongs =
        getSearchLikedSongs();


    if (
        likedSongs.includes(
            getSearchSongId(song)
        )
    ) {

        button.textContent =
            "♥";

        button.classList.add(
            "liked"
        );

        button.title =
            "Remove from Liked Songs";

    }

    else {

        button.textContent =
            "♡";

        button.classList.remove(
            "liked"
        );

        button.title =
            "Add to Liked Songs";

    }
}


// ==========================================
// PLAYLIST
// ==========================================

function getSearchPlaylist() {

    const stored =
        localStorage.getItem(
            "pralaxPlaylist"
        );


    if (!stored) {

        return [];
    }


    try {

        const data =
            JSON.parse(stored);


        return Array.isArray(data)
            ? data
            : [];

    }

    catch (error) {

        return [];
    }
}


// ==========================================
// ADD / REMOVE PLAYLIST
// ==========================================

function toggleSearchPlaylist(song) {

    let playlist =
        getSearchPlaylist();


    const songId =
        getSearchSongId(song);


    if (
        playlist.includes(
            songId
        )
    ) {

        playlist =
            playlist.filter(
                function (id) {

                    return (
                        id !== songId
                    );

                }
            );

    }

    else {

        playlist.push(
            songId
        );

    }


    localStorage.setItem(
        "pralaxPlaylist",
        JSON.stringify(
            playlist
        )
    );
}


// ==========================================
// PLAYLIST BUTTON DISPLAY
// ==========================================

function updateSearchPlaylistButton(
    button,
    song
) {

    const playlist =
        getSearchPlaylist();


    if (
        playlist.includes(
            getSearchSongId(song)
        )
    ) {

        button.textContent =
            "✓";

        button.classList.add(
            "added"
        );

        button.title =
            "Remove from My Playlist";

    }

    else {

        button.textContent =
            "+";

        button.classList.remove(
            "added"
        );

        button.title =
            "Add to My Playlist";

    }
}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadSearchSongs();


        const input =
            document.getElementById(
                "searchPageInput"
            );


        const button =
            document.getElementById(
                "searchPageButton"
            );


        // LIVE SEARCH

        if (input) {

            input.addEventListener(
                "input",
                performSearch
            );


            // ENTER KEY

            input.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        performSearch();

                    }

                }
            );
        }


        // SEARCH BUTTON

        if (button) {

            button.addEventListener(
                "click",
                performSearch
            );
        }

    }
);