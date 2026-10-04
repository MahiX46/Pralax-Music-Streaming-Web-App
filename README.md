# 🎵 Pralax – Music Streaming Web Application

Pralax is a web-based music streaming application developed as part of the Software Development Course (SDC).

The application provides a simple and personalized environment where users can discover, search, play, like, and organize music, while administrators can monitor and manage the platform.

---

## 📌 Problem Statement

Existing music streaming platforms provide large music libraries, but users have limited control over managing their own music collection in a simple personalized environment.

**Pralax 🎵** aims to develop a user-friendly web-based music streaming system where users can discover, search, play, organize, and manage music through a personalized library and playlists, while administrators can manage the platform's music content and users.

---

## ✨ Features

### 👤 User Module

Users can:

- Register a new account
- Login and logout
- Search songs
- Search by song, artist, or album
- Play and pause music
- Play next and previous songs
- Control song progress
- Control volume
- Like and unlike songs
- View Liked Songs
- Add songs to My Playlist
- Remove songs from My Playlist
- View their personalized music library

User registration and login information is managed using **Local Storage** as required for the project review.

---

### 🛡️ Admin Module

The Admin Dashboard provides:

- Total songs count
- Total albums count
- Registered users count
- Liked songs count
- Song information
- Registered user information
- User Active/Inactive status
- Platform monitoring and management functionality

---

## 🔍 Search Module

Pralax provides a dedicated Search page.

Users can search music using:

- Song title
- Artist name
- Album name

Search results are dynamically generated using JavaScript.

Users can directly:

- ▶ Play a song
- ♥ Add it to Liked Songs
- + Add it to My Playlist

---

## ❤️ Liked Songs

Users can like songs from Pralax.

Liked songs are stored using browser Local Storage and automatically appear inside the **Liked Songs / Library** page.

Users can also remove songs from their Liked Songs collection.

---

## 🎶 My Playlist

Users can create a personalized playlist by adding songs from the application.

Playlist information is stored using Local Storage.

Users can:

- Add songs
- Play playlist songs
- Remove songs
- Keep their playlist between page refreshes

---

## 🎧 Music Player

The Pralax music player supports:

- Play
- Pause
- Previous song
- Next song
- Song progress
- Duration display
- Volume control
- Album artwork
- Song title
- Artist information
- Automatic next-song playback

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- CSS Flexbox
- CSS Grid
- Browser Local Storage

### Backend

- Node.js
- Express.js
- REST API
- music-metadata

### Database Design

- PostgreSQL
- SQL schema and seed files

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Node.js
- npm

---

## ⚙️ System Architecture

```text
Music Collection
       ↓
Node.js + Express Backend
       ↓
REST API
       ↓
JavaScript Fetch API
       ↓
Pralax Frontend
       ↓
User Interface / Music Player
```

The backend scans the available music collection and provides song metadata through the REST API.

The frontend communicates with the backend using the JavaScript Fetch API.

---

## 📂 Project Structure

```text
PralaxStudios/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── search.html
│   ├── library.html
│   ├── playlist.html
│   ├── artist.html
│   ├── album.html
│   └── admin.html
│
├── css/
│   ├── style.css
│   ├── player.css
│   ├── login.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── player.js
│   ├── search.js
│   ├── auth.js
│   ├── playlist.js
│   ├── library.js
│   ├── admin.js
│   └── api.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── database/
│
├── images/
│   ├── logo.png
│   └── Sidebar.png
│
├── music/
│
├── .gitignore
└── README.md
```

---

## 🚀 How to Run Pralax

### 1. Clone the Repository

```bash
git clone https://github.com/MahiX46/Pralax-Music-Streaming-Web-App.git
```

### 2. Open the Project

```bash
cd Pralax-Music-Streaming-Web-App
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Start the Backend

```bash
node server.js
```

The backend runs locally on:

```text
http://localhost:3000
```

### 5. Start the Frontend

Open the project using Visual Studio Code and run:

```text
frontend/index.html
```

using **Live Server**.

---

## 🔐 Local Storage

Pralax uses browser Local Storage for several application features.

Examples include:

```text
pralaxUsers
pralaxCurrentUser
pralaxLikedSongs
pralaxPlaylist
```

This allows user information, liked songs, playlists, and login state to persist in the browser.

---

## 💡 Design Thinking & Innovation (DTI)

Pralax follows a user-centered development approach.

### Empathize

Understand the need for a simple and personalized music experience.

### Define

Identify the problem of organizing, discovering, and managing music in one interface.

### Ideate

Develop features such as:

- Search
- Liked Songs
- Personalized playlists
- Music player
- User authentication
- Admin dashboard

### Prototype

Develop the Pralax user interface using HTML, CSS, and JavaScript.

### Test

Test registration, login, music playback, search, liked songs, playlists, and Admin functionality.

---

## 👥 Team Members

| Student ID | Role |
|---|---|
| 2500049039 | Team Lead |
| 2500049029 | Team Member |
| 25000049047 | Team Member |

---

## 🎓 Academic Information

**University:** KL University, Vaddeswaram  
**Program:** B.Tech – Electronics and Communication Engineering (ECE)  
**Project:** Software Development Course (SDC)  
**Project Name:** Pralax 🎵 – Music Streaming Web Application

---

## 🎥 Project Demonstration

YouTube Demonstration:

**Coming Soon**

---

## 🔗 LinkedIn Project Article

LinkedIn Article:

**Coming Soon**

---

## 📦 GitHub Repository

Repository:

https://github.com/MahiX46/Pralax-Music-Streaming-Web-App

---

## ⚠️ Note

Audio files and environment configuration files are excluded from the public repository.

Users who run the project locally should provide their own authorized audio files for testing.

---

## 👨‍💻 Developed By

**Pralax Team**  
KL University, Vaddeswaram  
B.Tech ECE