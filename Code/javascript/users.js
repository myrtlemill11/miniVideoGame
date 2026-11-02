// Registration function
function register() {
    var feedback = document.getElementById("feedback");
    feedback.style.display = "none";

    // Get values from input fields
    const username = document.getElementById("UsernameInput").value;
    const password = document.getElementById("PasswordInput").value;
    const email = document.getElementById("EmailInput").value;
    const city = document.getElementById("CityInput").value;


    // Validation checks
    if (username === "" || password === "" || email === "" || city === "") {
        feedback.innerHTML = "All fields are required.";
        feedback.style.display = "none";
        return;
    }
    // Search for existing user
    else if (localStorage[username]) {
        feedback.style.display = "block";
        feedback.innerHTML = "Username already exists." + feedback.innerHTML;
        return;
    }

    //USe regex to check password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
     if (!passwordRegex.test(password)) {
     feedback.style.display = "block";
     feedback.innerHTML = "Password must be at least 6 characters long and include uppercase and lowercase characters with a number." + feedback.innerHTML;
     return;
     }   

    //use regex to check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        feedback.style.display = "block";
        feedback.innerHTML = "Invalid email format." + feedback.innerHTML;
        return;
    }


    //Create an object to hold the user data    
    const userData = {
        username: username,
        password: password,
        email: email,
        city: city,
        topScore: 0
    };

    //Store in local storage
    localStorage[username] = JSON.stringify(userData);
    feedback.innerHTML = "Registration successful! You can now log in.";

}

// Login function
function login() {
    //Clear previous feedback
    const feedback = document.getElementById("feedback");
    feedback.style.display = "none";
    //Get data entered by user
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //See if user exists
    if (!localStorage[username]) {
        feedback.style.display = "block";
        feedback.innerHTML = "User not found" + feedback.innerHTML;
        console.log("User not found");

    }

    //Get user data from local storage
    const userData = JSON.parse(localStorage[username]);


    //Check password
    if (userData.password !== password) {
        feedback.style.display = "block";
        feedback.innerHTML = "Incorrect password" + feedback.innerHTML;
        console.log("Incorrect password");
        return;
    }
    //If correct, log them in
    else if (userData.password === password) {
        sessionStorage.setItem("loggedInUser", username);
        feedback.style.display = "block";
        console.log("Login successful");
        feedback.innerHTML = "Login successful";
        window.location.href = "game.html";  //Redirect to game page
    }
}



function displayRankings(){
    // Create an array to hold user data
    const users = [];
    // HTML variable to build the rankings table
    let html ="<table>";
    // Retrieve all users from localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const username = localStorage.key(i);
        const userData = JSON.parse(localStorage[username]);
        users.push(userData);
        console.log(users);
    }
    // Sort users by topScore in descending order
    users.sort((a, b) => b.topScore - a.topScore);
    // Display rankings
    for (let index = 0; index < users.length; index++) {
        html+= "<tr>";
        html+= "<td>" + users[index].username + "</td>";
        html+= "<td>" + users[index].topScore + "</td>";
        html+= "<td>" + users[index].city + "</td>";
        html+= "</tr>";
        
    };
    document.getElementById("rankingsTable").innerHTML = html;
}

window.onload = displayRankings();







// Wait for user input
//let waitForPressResolve;
//function waitForPress() {
//return new Promise(resolve => waitForPressResolve = resolve);
//}

//const btn = document.querySelector("#submit");


