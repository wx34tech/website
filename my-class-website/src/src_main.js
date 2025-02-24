document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        alert(`Thank you, ${name}! We will contact you at ${email}.`);
    });
});