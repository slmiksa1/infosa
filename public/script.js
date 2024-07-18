async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    appendMessage('User', userInput);
    document.getElementById('user-input').value = '';

    try {
        const response = await fetch('/api/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });
        const data = await response.json();
        appendMessage('GPT', data.reply);
    } catch (error) {
        console.error('Error:', error);
    }
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
