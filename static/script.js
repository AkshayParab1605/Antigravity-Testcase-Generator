const chatArea = document.getElementById('chat-area');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(content, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;
    
    if (type === 'bot') {
        // Parse Markdown for bot messages
        // Check if marked is available
        if (typeof marked !== 'undefined') {
            msgDiv.innerHTML = marked.parse(content);
        } else {
            msgDiv.innerText = content; // Fallback
        }
    } else {
        msgDiv.textContent = content; // User content is plain text
    }
    
    chatArea.appendChild(msgDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
    return msgDiv;
}

function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot loading';
    loadingDiv.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';
    chatArea.appendChild(loadingDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
    return loadingDiv;
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Add user message
    addMessage(text, 'user');
    userInput.value = '';
    userInput.disabled = true;
    sendBtn.disabled = true;
    sendBtn.innerText = 'Generating...';

    // Show loading
    const loadingEl = showLoading();

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: text })
        });

        const data = await response.json();
        
        // Remove loading
        loadingEl.remove();

        if (data.success) {
            addMessage(data.result, 'bot');
        } else {
            addMessage(`**Error**: ${data.error}`, 'bot');
        }
    } catch (error) {
        loadingEl.remove();
        addMessage(`**Network Error**: ${error.message}. Is the server running?`, 'bot');
    } finally {
        userInput.disabled = false;
        sendBtn.disabled = false;
        sendBtn.innerText = 'Generate Cases';
        userInput.focus();
    }
}

// Allow Enter key to submit (Shift+Enter for new line)
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
