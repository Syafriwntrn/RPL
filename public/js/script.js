// Inside script.js
document.getElementById('loginButton').addEventListener('click', function() {
    // Navigate to login.html
    window.location.href = 'login.html';
});

function navigateToIndex(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Navigate back to index.html
    window.location.href = 'index.html';
}
