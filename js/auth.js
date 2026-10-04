// ==========================================
// PRALAX AUTHENTICATION
// ==========================================


// ==========================================
// GET REGISTERED USERS
// ==========================================

function getRegisteredUsers() {

    try {

        const storedUsers =
            localStorage.getItem("pralaxUsers");

        if (!storedUsers) {
            return [];
        }

        const users = JSON.parse(storedUsers);

        return Array.isArray(users)
            ? users
            : [];

    } catch (error) {

        console.error(
            "Unable to read registered users:",
            error
        );

        return [];
    }
}


// ==========================================
// SAVE REGISTERED USERS
// ==========================================

function saveRegisteredUsers(users) {

    localStorage.setItem(
        "pralaxUsers",
        JSON.stringify(users)
    );
}


// ==========================================
// SIGN UP
// ==========================================

function registerUser(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("registerName")
            .value
            .trim();


    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("registerPassword")
            .value;


    const confirmPassword =
        document
            .getElementById("confirmPassword")
            .value;


    const message =
        document.getElementById("authMessage");


    // EMPTY FIELD CHECK

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        message.textContent =
            "Please fill all fields.";

        return;
    }


    // PASSWORD MATCH

    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        return;
    }


    // PASSWORD LENGTH

    if (password.length < 6) {

        message.textContent =
            "Password must contain at least 6 characters.";

        return;
    }


    const users =
        getRegisteredUsers();


    // CHECK EXISTING EMAIL

    const existingUser =
        users.find(function (user) {

            return user.email === email;

        });


    if (existingUser) {

        message.textContent =
            "Account already exists with this email.";

        return;
    }


    // NEW USER
    // Newly registered user is inactive
    // until they actually login.

    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        password: password,

        role: "user",

        status: "Inactive"

    };


    users.push(newUser);


    saveRegisteredUsers(users);


    message.textContent =
        "Account created successfully!";


    // GO TO LOGIN PAGE

    setTimeout(function () {

        window.location.href =
            "login.html";

    }, 1000);
}



// ==========================================
// LOGIN
// ==========================================

function loginUser(event) {

    event.preventDefault();


    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    const message =
        document.getElementById("authMessage");


    const users =
        getRegisteredUsers();


    // FIND USER

    const user =
        users.find(function (storedUser) {

            return (
                storedUser.email === email &&
                storedUser.password === password
            );

        });


    // WRONG LOGIN

    if (!user) {

        message.textContent =
            "Invalid email or password.";

        return;
    }


    // ==========================================
    // MAKE USER ACTIVE
    // ==========================================

    user.status = "Active";

    saveRegisteredUsers(users);


    // CURRENT LOGGED-IN USER

    const loggedInUser = {

        id: user.id,

        name: user.name,

        email: user.email,

        role: user.role,

        status: "Active"

    };


    localStorage.setItem(
        "pralaxCurrentUser",
        JSON.stringify(loggedInUser)
    );


    message.textContent =
        "Login successful!";


    // GO TO HOMEPAGE

    setTimeout(function () {

        window.location.href =
            "index.html";

    }, 700);
}



// ==========================================
// GET CURRENT USER
// ==========================================

function getCurrentUser() {

    try {

        const storedUser =
            localStorage.getItem(
                "pralaxCurrentUser"
            );


        if (!storedUser) {
            return null;
        }


        return JSON.parse(storedUser);

    } catch (error) {

        console.error(
            "Unable to read current user:",
            error
        );

        return null;
    }
}



// ==========================================
// LOGOUT
// ==========================================

function logoutUser() {

    const currentUser =
        getCurrentUser();


    // ==========================================
    // MAKE CURRENT USER INACTIVE
    // ==========================================

    if (currentUser) {

        const users =
            getRegisteredUsers();


        const user =
            users.find(function (storedUser) {

                return (
                    storedUser.id === currentUser.id
                );

            });


        if (user) {

            user.status =
                "Inactive";

            saveRegisteredUsers(users);
        }
    }


    // REMOVE ONLY CURRENT LOGIN

    localStorage.removeItem(
        "pralaxCurrentUser"
    );


    // REGISTERED USERS REMAIN SAVED

    window.location.href =
        "index.html";
}



// ==========================================
// HOMEPAGE USER DISPLAY
// ==========================================

function updateAuthUI() {

    const authArea =
        document.getElementById(
            "authArea"
        );


    if (!authArea) {
        return;
    }


    const user =
        getCurrentUser();


    // ==========================================
    // LOGGED IN
    // ==========================================

    if (user) {

        // Example:
        // Mahonnath -> M

        const firstLetter =
            user.name
                .charAt(0)
                .toUpperCase();


        authArea.innerHTML = `

            <div class="user-account">

                <div class="user-avatar">
                    ${firstLetter}
                </div>

                <span class="user-name">
                    ${user.name}
                </span>

                <button
                    class="logout-button"
                    onclick="logoutUser()"
                >
                    Logout
                </button>

            </div>

        `;

    }


    // ==========================================
    // NOT LOGGED IN
    // ==========================================

    else {

        authArea.innerHTML = `

            <a
                href="login.html"
                class="login-link"
            >
                Login
            </a>

            <a
                href="register.html"
                class="signup-link"
            >
                Sign Up
            </a>

        `;
    }
}



// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    updateAuthUI
);