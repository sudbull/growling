document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const contactName = document.getElementById('contact-name').value;
    const message = document.getElementById('message').value;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById('contact-name-display').innerText = contactName;

    const chatContent = document.getElementById('chat-content');

    // Create a chat bubble
    const chatBubble = document.createElement('div');
    chatBubble.className = 'chat-bubble';

    const messageElem = document.createElement('div');
    messageElem.innerText = message;

    const timeElem = document.createElement('div');
    timeElem.className = 'time';
    timeElem.innerText = time;

    chatBubble.appendChild(messageElem);
    chatBubble.appendChild(timeElem);

    chatContent.appendChild(chatBubble);

    // Scroll to the bottom of the chat content
    chatContent.scrollTop = chatContent.scrollHeight;

    // Clear the message input
    document.getElementById('message').value = '';
});

// Add event listener for the footer input and send button
document.getElementById('send-button').addEventListener('click', function() {
    const footerInput = document.getElementById('footer-input');
    const message = footerInput.value;

    if (message.trim() !== "") {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const chatContent = document.getElementById('chat-content');

        // Create a chat bubble
        const chatBubble = document.createElement('div');
        chatBubble.className = 'chat-bubble';

        const messageElem = document.createElement('div');
        messageElem.innerText = message;

        const timeElem = document.createElement('div');
        timeElem.className = 'time';
        timeElem.innerText = time;

        chatBubble.appendChild(messageElem);
        chatBubble.appendChild(timeElem);

        chatContent.appendChild(chatBubble);

        // Scroll to the bottom of the chat content
        chatContent.scrollTop = chatContent.scrollHeight;

        // Clear the message input
        footerInput.value = '';
    }
});

// Function to export the chat mockup as a video
document.getElementById('export-video').addEventListener('click', function() {
    const mockupContainer = document.querySelector('.mockup-container');

    html2canvas(mockupContainer).then(canvas => {
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);

            const chunks = [];
            const stream = canvas.captureStream();
            const recorder = new MediaRecorder(stream);

            recorder.ondataavailable = function(event) {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            recorder.onstop = function() {
                const videoBlob = new Blob(chunks, { type: 'video/webm' });
                const videoURL = URL.createObjectURL(videoBlob);

                const downloadLink = document.createElement('a');
                downloadLink.href = videoURL;
                downloadLink.download = 'chat_mockup.webm';
                downloadLink.click();
            };

            recorder.start();
            setTimeout(() => {
                recorder.stop();
            }, 3000);  // Record for 3 seconds
        });
    });
});
