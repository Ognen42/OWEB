var users = {
    'user1': '123',
    'user2': '456'
};

function check_login(username, password) {
    if (users[username] && users[username] === password) {
        localStorage.setItem('logged_in', username);
        return true;
    }
    return false;
}

function login_submit(event) {
    event.preventDefault();

    var form = event.target;
    var username = form.username.value;
    var password = form.password.value;
    
    if (check_login(username, password))
        window.location.href = '../home.html';
    else
        alert('Invalid username or password');
}

function initialize_login() {
    var form = document.getElementById('login_form');
    if (form)
        form.addEventListener('submit', login_submit);
}

function check_auth() {
    var logged_in = localStorage.getItem('logged_in');
    if (!logged_in)
        if (!window.location.href.includes('login.html'))
            window.location.href = 'Subpages/login.html';
}

if (window.location.href.includes('login.html')) {
    initialize_login();
}