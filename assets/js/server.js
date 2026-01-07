document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emailForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const toEmail = document.getElementById('userEmail').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const templateParams = {
            to_email: toEmail,
            subject: subject,
            message: message
        };

        // Send email via EmailJS
        emailjs.send('service_l2dwyoa', 'template_pomqveb', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Email sent successfully!');
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send email. Check console for details.');
            });
    });
});
