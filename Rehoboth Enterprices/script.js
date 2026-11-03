async function handleFormSubmit(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const statusText = document.getElementById('formStatus');

    // 1. Visual feedback
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusText.textContent = '';

    // 2. Gather form inputs & add your Web3Forms Access Key
    const payload = {
        access_key: '0ac2f699-d17f-4db0-9a9b-08fffde57ac7', // Paste your Access Key here
        name: document.getElementById('fullname').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    try {
        // 3. POST request directly to Web3Forms API
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.success) {
            // Success state
            statusText.style.color = '#2e7d32'; // Green
            statusText.textContent = 'Thank you! Your inquiry has been sent successfully.';
            document.getElementById('rehobothContactForm').reset();
        } else {
            throw new Error(result.message || 'Submission failed');
        }
    } catch (error) {
        console.error('Submission error:', error);
        statusText.style.color = '#d32f2f'; // Red
        statusText.textContent = 'Failed to send inquiry. Please try again or call us directly.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Inquiry';
    }
}