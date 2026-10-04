// ==========================================
// PRALAX MAIN APPLICATION
// ==========================================

const API_URL = "http://localhost:3000";


// ==========================================
// LOAD SONGS FROM BACKEND
// ==========================================

async function loadSongs() {

    try {

        console.log("Connecting to Pralax backend...");

        const response =
            await fetch(`${API_URL}/api/songs`);

        if (!response.ok) {
            throw new Error(
                "Unable to load songs"
            );
        }

        const data =
            await response.json();

        // songs is declared in player.js
        songs = data;

        console.log(
            "Songs loaded:",
            songs.length
        );

        console.log(songs);

        // DISPLAY EVERYTHING
        displayQuickPicks();
        displaySongs();
        displayAlbums();
        displayArtists();

    }

    catch (error) {

        console.error(
            "Pralax API Error:",
            error
        );

        const songList =
            document.getElementById(
                "songList"
            );

        if (songList) {

            songList.innerHTML =
                "<p>Unable to connect to Pralax backend.</p>";
        }
    }
}


// ==========================================
// QUICK PICKS
// ==========================================

function displayQuickPicks() {

    const container =
        document.getElementById(
            "quickPicks"
        );

    if (!container) return;

    container.innerHTML = "";

    // FIRST 8 SONGS
    const quickSongs =
        songs.slice(0, 8);

    quickSongs.forEach(
        function (song, index) {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "music-card";

            card.onclick =
                function () {

                    playSong(index);
                };


            // COVER

            const image =
                document.createElement(
                    "img"
                );

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


            // TITLE

            const title =
                document.createElement(
                    "h3"
                );

            title.textContent =
                cleanTitle(
                    song.title
                );


            // ARTIST

            const artist =
                document.createElement(
                    "p"
                );

            artist.textContent =
                song.artist;


            // ADD TO CARD

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(artist);


            // ADD TO PAGE

            container.appendChild(card);
        }
    );
}


// ==========================================
// POPULAR SONGS
// ==========================================

function displaySongs() {

    const container =
        document.getElementById(
            "songList"
        );

    if (!container) return;

    container.innerHTML = "";

    songs.forEach(
        function (song, index) {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "song-item";

            item.onclick =
                function () {

                    playSong(index);
                };


            // NUMBER

            const number =
                document.createElement(
                    "div"
                );

            number.className =
                "song-number";

            number.textContent =
                index + 1;


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
                song.title;

            image.onerror =
                function () {

                    this.onerror = null;

                    this.src =
                        "../images/logo.png";
                };


            // SONG INFO

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
                song.artist;


            info.appendChild(title);
            info.appendChild(artist);


            // ==========================================
            // LIKE BUTTON
            // ==========================================

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

                    // Do not play song when
                    // heart button is clicked

                    event.stopPropagation();

                    toggleLike(song);

                    updateLikeButton(
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


            updatePlaylistButton(
                playlistButton,
                song
            );


            playlistButton.onclick =
                function (event) {

                    // Do not play song when
                    // playlist button is clicked

                    event.stopPropagation();

                    togglePlaylist(song);

                    updatePlaylistButton(
                        playlistButton,
                        song
                    );
                };


            // ==========================================
            // ADD TO SONG ROW
            // ==========================================

            item.appendChild(number);
            item.appendChild(image);
            item.appendChild(info);
            item.appendChild(likeButton);
            item.appendChild(playlistButton);

            container.appendChild(item);
        }
    );
}


// ==========================================
// POPULAR ALBUMS
// ==========================================

function displayAlbums() {

    const container =
        document.getElementById(
            "albumList"
        );

    if (!container) return;

    container.innerHTML = "";

    /*
       Use songs 9-14 so this section
       doesn't look exactly the same
       as Quick Picks.
    */

    const albumSongs =
        songs.slice(8, 14);

    albumSongs.forEach(
        function (song, index) {

            const realIndex =
                index + 8;


            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "music-card";

            card.onclick =
                function () {

                    playSong(
                        realIndex
                    );
                };


            // COVER IMAGE

            const image =
                document.createElement(
                    "img"
                );

            image.src =
                song.cover;

            image.alt =
                song.album ||
                song.title;

            image.onerror =
                function () {

                    this.onerror = null;

                    this.src =
                        "../images/logo.png";
                };


            // ALBUM NAME

            const title =
                document.createElement(
                    "h3"
                );

            if (
                song.album &&
                song.album !==
                    "Unknown Album"
            ) {

                title.textContent =
                    song.album;
            }

            else {

                title.textContent =
                    cleanTitle(
                        song.title
                    );
            }


            // ARTIST

            const artist =
                document.createElement(
                    "p"
                );

            artist.textContent =
                song.artist;


            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(artist);

            container.appendChild(card);
        }
    );
}


// ==========================================
// POPULAR ARTISTS
// ==========================================

function displayArtists() {

    const container =
        document.getElementById(
            "artistList"
        );

    if (!container) return;

    container.innerHTML = "";

    /*
       Use songs 15-20 for
       artist cards.
    */

    const artistSongs =
        songs.slice(14, 20);

    artistSongs.forEach(
        function (song, index) {

            const realIndex =
                index + 14;


            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "artist-card";

            card.onclick =
                function () {

                    playSong(
                        realIndex
                    );
                };


            // ARTIST IMAGE
            // Uses embedded song artwork

            const image =
                document.createElement(
                    "img"
                );

            image.src =
                song.cover;

            image.alt =
                song.artist;

            image.onerror =
                function () {

                    this.onerror = null;

                    this.src =
                        "../images/logo.png";
                };


            // ARTIST NAME

            const title =
                document.createElement(
                    "h3"
                );

            title.textContent =
                song.artist;


            // SONG NAME

            const subtitle =
                document.createElement(
                    "p"
                );

            subtitle.textContent =
                cleanTitle(
                    song.title
                );


            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(subtitle);

            container.appendChild(card);
        }
    );
}


// ==========================================
// CLEAN SONG TITLE
// ==========================================

function cleanTitle(title) {

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
// SEARCH
// ==========================================

function searchSongs() {

    const input =
        document.getElementById(
            "searchInput"
        );

    if (!input) return;

    const query =
        input.value
            .trim()
            .toLowerCase();


    // EMPTY SEARCH

    if (query === "") {

        displaySongs();

        return;
    }


    const container =
        document.getElementById(
            "songList"
        );

    if (!container) return;

    container.innerHTML = "";


    songs.forEach(
        function (song, index) {

            const title =
                (song.title || "")
                    .toLowerCase();

            const artist =
                (song.artist || "")
                    .toLowerCase();

            const album =
                (song.album || "")
                    .toLowerCase();


            if (
                title.includes(query) ||
                artist.includes(query) ||
                album.includes(query)
            ) {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "song-item";

                item.onclick =
                    function () {

                        playSong(index);
                    };


                // NUMBER

                const number =
                    document.createElement(
                        "div"
                    );

                number.className =
                    "song-number";

                number.textContent =
                    index + 1;


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
                    song.title;

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


                const songTitle =
                    document.createElement(
                        "h3"
                    );

                songTitle.textContent =
                    cleanTitle(
                        song.title
                    );


                const songArtist =
                    document.createElement(
                        "p"
                    );

                songArtist.textContent =
                    song.artist;


                info.appendChild(
                    songTitle
                );

                info.appendChild(
                    songArtist
                );


                // ==========================================
                // LIKE BUTTON FOR SEARCH RESULTS
                // ==========================================

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


                // ==========================================
                // PLAYLIST BUTTON FOR SEARCH RESULTS
                // ==========================================

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

                        togglePlaylist(song);

                        updatePlaylistButton(
                            playlistButton,
                            song
                        );
                    };


                // ==========================================
                // ADD TO SEARCH RESULT
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
        }
    );
}


// ==========================================
// LIKED SONGS
// ==========================================

function getLikedSongs() {

    const stored =
        localStorage.getItem(
            "pralaxLikedSongs"
        );

    if (!stored) {

        return [];
    }

    try {

        return JSON.parse(
            stored
        );

    }

    catch (error) {

        console.error(
            "Unable to read liked songs:",
            error
        );

        return [];
    }
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
// CHECK IF SONG IS LIKED
// ==========================================

function isSongLiked(song) {

    const likedSongs =
        getLikedSongs();

    return likedSongs.includes(
        getSongId(song)
    );
}


// ==========================================
// LIKE / UNLIKE SONG
// ==========================================

function toggleLike(song) {

    let likedSongs =
        getLikedSongs();

    const songId =
        getSongId(song);


    // IF ALREADY LIKED -> REMOVE

    if (
        likedSongs.includes(
            songId
        )
    ) {

        likedSongs =
            likedSongs.filter(
                function (id) {

                    return id !== songId;
                }
            );
    }


    // IF NOT LIKED -> ADD

    else {

        likedSongs.push(
            songId
        );
    }


    // SAVE TO LOCAL STORAGE

    localStorage.setItem(
        "pralaxLikedSongs",
        JSON.stringify(
            likedSongs
        )
    );
}


// ==========================================
// HEART DISPLAY
// ==========================================

function updateLikeButton(
    button,
    song
) {

    if (
        isSongLiked(song)
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
// MY PLAYLIST
// ==========================================

function getPlaylist() {

    const stored =
        localStorage.getItem(
            "pralaxPlaylist"
        );

    if (!stored) {

        return [];
    }


    try {

        const playlist =
            JSON.parse(stored);

        if (
            Array.isArray(
                playlist
            )
        ) {

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
// CHECK IF SONG IS IN PLAYLIST
// ==========================================

function isSongInPlaylist(song) {

    const playlist =
        getPlaylist();

    return playlist.includes(
        getSongId(song)
    );
}


// ==========================================
// ADD / REMOVE SONG FROM PLAYLIST
// ==========================================

function togglePlaylist(song) {

    let playlist =
        getPlaylist();

    const songId =
        getSongId(song);


    // ==========================================
    // IF ALREADY ADDED -> REMOVE
    // ==========================================

    if (
        playlist.includes(
            songId
        )
    ) {

        playlist =
            playlist.filter(
                function (id) {

                    return id !== songId;
                }
            );

    }


    // ==========================================
    // IF NOT ADDED -> ADD
    // ==========================================

    else {

        playlist.push(
            songId
        );

    }


    // ==========================================
    // SAVE PLAYLIST
    // ==========================================

    localStorage.setItem(
        "pralaxPlaylist",
        JSON.stringify(
            playlist
        )
    );
}


// ==========================================
// UPDATE PLAYLIST BUTTON
// ==========================================

function updatePlaylistButton(
    button,
    song
) {

    if (
        isSongInPlaylist(song)
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

        // LOAD MUSIC

        loadSongs();


        // LIVE SEARCH

        const input =
            document.getElementById(
                "searchInput"
            );

        if (input) {

            input.addEventListener(
                "input",
                searchSongs
            );
        }
    }
);