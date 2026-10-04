const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = 3000;


// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());


// =====================================
// MUSIC FOLDER LOCATION
// =====================================

const musicFolder = path.join(
    __dirname,
    "../music"
);


// =====================================
// MAKE MUSIC FILES ACCESSIBLE
// =====================================

app.use(
    "/music",
    express.static(musicFolder)
);


// =====================================
// HOME ROUTE
// =====================================

app.get("/", (req, res) => {

    res.json({

        message:
            "Pralax Backend is running 🎵"

    });

});


// =====================================
// GET ALL SONGS
// =====================================

app.get(
    "/api/songs",
    async (req, res) => {

        try {

            const musicMetadata =
                await import(
                    "music-metadata"
                );


            // Read files from music folder

            const files =
                fs.readdirSync(
                    musicFolder
                );


            // Keep only audio files

            const audioFiles =
                files.filter(
                    function (file) {

                        const extension =
                            path
                                .extname(file)
                                .toLowerCase();


                        return [

                            ".mp3",
                            ".m4a",
                            ".wav",
                            ".flac"

                        ].includes(
                            extension
                        );

                    }
                );


            const songs = [];


            // Read every song

            for (
                let i = 0;
                i < audioFiles.length;
                i++
            ) {

                const file =
                    audioFiles[i];


                const fullPath =
                    path.join(
                        musicFolder,
                        file
                    );


                try {

                    // Read MP3 metadata

                    const metadata =
                        await musicMetadata
                            .parseFile(
                                fullPath
                            );


                    // Song information

                    const song = {

                        id:
                            i + 1,


                        title:
                            metadata
                                .common
                                .title
                            ||
                            path
                                .parse(file)
                                .name,


                        artist:
                            metadata
                                .common
                                .artist
                            ||
                            "Unknown Artist",


                        album:
                            metadata
                                .common
                                .album
                            ||
                            "Unknown Album",


                        filename:
                            file,


                        audio:
                            `http://localhost:${PORT}/music/${encodeURIComponent(file)}`,


                        cover:
                            `http://localhost:${PORT}/api/cover/${encodeURIComponent(file)}`

                    };


                    songs.push(
                        song
                    );

                }

                catch (metadataError) {

                    console.log(
                        "Could not read metadata:",
                        file
                    );


                    songs.push({

                        id:
                            i + 1,


                        title:
                            path
                                .parse(file)
                                .name,


                        artist:
                            "Unknown Artist",


                        album:
                            "Unknown Album",


                        filename:
                            file,


                        audio:
                            `http://localhost:${PORT}/music/${encodeURIComponent(file)}`,


                        cover:
                            `http://localhost:${PORT}/api/cover/${encodeURIComponent(file)}`

                    });

                }

            }


            // Send songs to frontend

            res.json(
                songs
            );

        }

        catch (error) {

            console.error(
                "Song API error:",
                error
            );


            res
                .status(500)
                .json({

                    message:
                        "Unable to load songs",

                    error:
                        error.message

                });

        }

    }
);


// =====================================
// GET EMBEDDED COVER IMAGE
// =====================================

app.get(
    "/api/cover/:filename",
    async (req, res) => {

        try {

            const musicMetadata =
                await import(
                    "music-metadata"
                );


            const filename =
                req.params.filename;


            const fullPath =
                path.join(
                    musicFolder,
                    filename
                );


            // Check file exists

            if (
                !fs.existsSync(
                    fullPath
                )
            ) {

                return res
                    .status(404)
                    .send(
                        "Song not found"
                    );

            }


            // Read metadata

            const metadata =
                await musicMetadata
                    .parseFile(
                        fullPath
                    );


            // Embedded pictures

            const pictures =
                metadata
                    .common
                    .picture;


            // No image inside MP3

            if (
                !pictures ||
                pictures.length === 0
            ) {

                return res
                    .status(404)
                    .send(
                        "No embedded cover"
                    );

            }


            const picture =
                pictures[0];


            // Tell browser image type

            res.set(
                "Content-Type",
                picture.format
            );


            // Send actual image

            res.send(
                picture.data
            );

        }

        catch (error) {

            console.error(
                "Cover error:",
                error
            );


            res
                .status(500)
                .send(
                    "Unable to load cover"
                );

        }

    }
);


// =====================================
// START SERVER
// =====================================

app.listen(
    PORT,
    () => {

        console.log(
            "================================="
        );

        console.log(
            "🎵 PRALAX BACKEND STARTED"
        );

        console.log(
            `http://localhost:${PORT}`
        );

        console.log(
            `http://localhost:${PORT}/api/songs`
        );

        console.log(
            "================================="
        );

    }
);