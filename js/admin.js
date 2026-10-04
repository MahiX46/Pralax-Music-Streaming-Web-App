// ==========================================
// PRALAX ADMIN DASHBOARD
// ==========================================

const ADMIN_API_URL = "http://localhost:3000";


// ==========================================
// LOAD ADMIN DASHBOARD
// ==========================================

async function loadAdminDashboard() {

    console.log("Loading Pralax Admin Dashboard...");

    // Load users and likes from Local Storage
    loadAdminUsers();
    loadLikedCount();

    // Load songs from backend
    await loadAdminSongs();
}


// ==========================================
// LOAD SONGS FROM BACKEND
// ==========================================

async function loadAdminSongs() {

    const songList =
        document.getElementById("adminSongList");

    const songCount =
        document.getElementById("adminSongCount");

    const albumCount =
        document.getElementById("adminAlbumCount");


    try {

        const response =
            await fetch(
                `${ADMIN_API_URL}/api/songs`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load songs"
            );
        }


        const songs =
            await response.json();


        console.log(
            "Admin songs loaded:",
            songs.length
        );


        // ==========================================
        // TOTAL SONG COUNT
        // ==========================================

        if (songCount) {

            songCount.textContent =
                songs.length;
        }


        // ==========================================
        // ALBUM COUNT
        // ==========================================

        const albums =
            new Set();


        songs.forEach(
            function (song) {

                if (
                    song.album &&
                    song.album !== "Unknown Album"
                ) {

                    albums.add(
                        song.album
                    );
                }
            }
        );


        if (albumCount) {

            albumCount.textContent =
                albums.size;
        }


        // ==========================================
        // DISPLAY SONGS
        // ==========================================

        displayAdminSongs(
            songs
        );

    }

    catch (error) {

        console.error(
            "Admin API Error:",
            error
        );


        if (songList) {

            songList.innerHTML = `

                <div class="admin-error">

                    <p>
                        Unable to connect to Pralax backend.
                    </p>

                    <p>
                        Make sure server.js is running.
                    </p>

                </div>

            `;
        }
    }
}


// ==========================================
// DISPLAY SONGS
// ==========================================

function displayAdminSongs(songs) {

    const container =
        document.getElementById(
            "adminSongList"
        );


    if (!container) return;


    container.innerHTML = "";


    songs.forEach(
        function (song, index) {


            // SONG ROW

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "admin-song-row";


            // ==========================================
            // NUMBER
            // ==========================================

            const number =
                document.createElement(
                    "span"
                );


            number.textContent =
                index + 1;


            // ==========================================
            // SONG INFORMATION
            // ==========================================

            const songInfo =
                document.createElement(
                    "div"
                );


            songInfo.className =
                "admin-song-info";


            // COVER

            const cover =
                document.createElement(
                    "img"
                );


            cover.src =
                song.cover;


            cover.alt =
                song.title ||
                "Song Cover";


            cover.onerror =
                function () {

                    this.onerror = null;

                    this.src =
                        "../images/logo.png";
                };


            // TITLE

            const title =
                document.createElement(
                    "span"
                );


            title.textContent =
                cleanAdminTitle(
                    song.title
                );


            songInfo.appendChild(
                cover
            );


            songInfo.appendChild(
                title
            );


            // ==========================================
            // ARTIST
            // ==========================================

            const artist =
                document.createElement(
                    "span"
                );


            artist.textContent =
                song.artist ||
                "Unknown Artist";


            // ==========================================
            // ALBUM
            // ==========================================

            const album =
                document.createElement(
                    "span"
                );


            album.textContent =
                song.album ||
                "Unknown Album";


            // ==========================================
            // ACTION
            // ==========================================

            const action =
                document.createElement(
                    "span"
                );


            const viewButton =
                document.createElement(
                    "button"
                );


            viewButton.className =
                "admin-view-button";


            viewButton.textContent =
                "View";


            viewButton.onclick =
                function () {

                    playAdminSong(
                        song
                    );
                };


            action.appendChild(
                viewButton
            );


            // ==========================================
            // ADD TO ROW
            // ==========================================

            row.appendChild(
                number
            );


            row.appendChild(
                songInfo
            );


            row.appendChild(
                artist
            );


            row.appendChild(
                album
            );


            row.appendChild(
                action
            );


            // ==========================================
            // ADD ROW TO PAGE
            // ==========================================

            container.appendChild(
                row
            );

        }
    );
}


// ==========================================
// LOAD USERS FROM LOCAL STORAGE
// ==========================================

function loadAdminUsers() {

    const container =
        document.getElementById(
            "adminUserList"
        );


    const count =
        document.getElementById(
            "adminUserCount"
        );


    let users = [];


    try {

        const storedUsers =
            localStorage.getItem(
                "pralaxUsers"
            );


        if (storedUsers) {

            users =
                JSON.parse(
                    storedUsers
                );
        }

    }

    catch (error) {

        console.error(
            "Unable to read users:",
            error
        );

        users = [];
    }


    // ==========================================
    // USER COUNT
    // ==========================================

    if (count) {

        count.textContent =
            users.length;
    }


    if (!container) return;


    container.innerHTML = "";


    // ==========================================
    // NO USERS
    // ==========================================

    if (users.length === 0) {

        container.innerHTML = `

            <p class="admin-loading">
                No registered users found.
            </p>

        `;

        return;
    }


    // ==========================================
    // DISPLAY USERS
    // ==========================================

    users.forEach(
        function (user, index) {


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "admin-user-row";


            // NUMBER

            const number =
                document.createElement(
                    "span"
                );


            number.textContent =
                index + 1;


            // NAME

            const name =
                document.createElement(
                    "span"
                );


            name.textContent =
                user.name ||
                "Pralax User";


            // EMAIL

            const email =
                document.createElement(
                    "span"
                );


            email.textContent =
                user.email ||
                "No Email";


            // ==========================================
            // STATUS
            // ==========================================

            const status =
                document.createElement(
                    "span"
                );


            status.className =
                "admin-user-status";


            // Get actual status saved by auth.js.
            // Old users without a status are
            // treated as Inactive.

            const userStatus =
                user.status ||
                "Inactive";


            status.textContent =
                userStatus;


            // ACTIVE USER

            if (
                userStatus === "Active"
            ) {

                status.classList.add(
                    "active-status"
                );

            }

            // INACTIVE USER

            else {

                status.classList.add(
                    "inactive-status"
                );

            }


            // ==========================================
            // ADD TO ROW
            // ==========================================

            row.appendChild(
                number
            );


            row.appendChild(
                name
            );


            row.appendChild(
                email
            );


            row.appendChild(
                status
            );


            container.appendChild(
                row
            );

        }
    );
}


// ==========================================
// LOAD LIKED SONG COUNT
// ==========================================

function loadLikedCount() {

    const count =
        document.getElementById(
            "adminLikeCount"
        );


    let likedSongs = [];


    try {

        const stored =
            localStorage.getItem(
                "pralaxLikedSongs"
            );


        if (stored) {

            likedSongs =
                JSON.parse(
                    stored
                );
        }

    }

    catch (error) {

        console.error(
            "Unable to read liked songs:",
            error
        );

        likedSongs = [];
    }


    if (count) {

        count.textContent =
            likedSongs.length;
    }
}


// ==========================================
// CLEAN SONG TITLE
// ==========================================

function cleanAdminTitle(title) {

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
// VIEW / PLAY SONG
// ==========================================

function playAdminSong(song) {

    if (!song.audio) {

        alert(
            "Audio file is unavailable."
        );

        return;
    }


    const audio =
        new Audio(
            song.audio
        );


    audio.play()
        .catch(
            function (error) {

                console.error(
                    "Unable to play song:",
                    error
                );

            }
        );
}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadAdminDashboard();

    }
);