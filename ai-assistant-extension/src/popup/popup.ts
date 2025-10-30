// Popup UI Controller
console.log('🎨 Popup script loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Popup DOM loaded, initializing...');
  
  const userInput = document.getElementById('user-input') as HTMLInputElement;
  const sendBtn = document.getElementById('send-btn') as HTMLButtonElement;
  const chatMessages = document.getElementById('chat-messages') as HTMLDivElement;
  const toggleAvatarBtn = document.getElementById('toggle-avatar-btn') as HTMLButtonElement;
  const analyzePageBtn = document.getElementById('analyze-page-btn') as HTMLButtonElement;

  if (!userInput || !sendBtn || !chatMessages) {
    console.error('❌ Required elements not found!');
    return;
  }

  console.log('✅ All elements found, setting up event listeners...');

  // Send message handler
  sendBtn.addEventListener('click', () => {
    console.log('📤 Send button clicked');
    sendMessage();
  });
  
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      console.log('⏎ Enter pressed');
      sendMessage();
    }
  });

  // Toggle avatar
  toggleAvatarBtn.addEventListener('click', async () => {
    console.log('🔄 Toggle avatar clicked');
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_AVATAR' }, (response) => {
        console.log('Avatar toggled:', response);
        if (chrome.runtime.lastError) {
          console.error('Error toggling avatar:', chrome.runtime.lastError);
          addMessage('Error: Could not toggle avatar', 'error');
        } else if (response && response.success) {
          addMessage(`Avatar ${response.visible ? 'shown' : 'hidden'}`, 'assistant');
        }
      });
    } else {
      console.error('No valid tab ID');
      addMessage('Error: No active tab', 'error');
    }
  });

  // Analyze page
  analyzePageBtn.addEventListener('click', async () => {
    console.log('📊 Analyze page clicked');
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_PAGE_CONTENT' }, (response) => {
        console.log('Page analysis response:', response);
        if (chrome.runtime.lastError) {
          console.error('Error analyzing page:', chrome.runtime.lastError);
          addMessage('Error: Could not analyze page', 'error');
        } else if (response && response.success) {
          addMessage(`📄 Page analyzed: ${response.content.title}`, 'assistant');
        }
      });
    } else {
      console.error('No valid tab ID');
      addMessage('Error: No active tab', 'error');
    }
  });

  function sendMessage() {
    const message = userInput.value.trim();
    console.log('💬 Sending message:', message);
    
    if (!message) {
      console.log('⚠️ Empty message, ignoring');
      return;
    }

    addMessage(message, 'user');
    userInput.value = '';

    // Send to background for AI processing
    chrome.runtime.sendMessage(
      { type: 'AI_QUERY', query: message },
      (response) => {
        console.log('🤖 AI response:', response);
        if (response && response.success) {
          addMessage(response.response, 'assistant');
        } else {
          addMessage('Error: ' + (response?.error || 'Unknown error'), 'error');
        }
      }
    );
  }

  function addMessage(text: string, sender: 'user' | 'assistant' | 'error') {
    console.log(`➕ Adding message: [${sender}] ${text}`);
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});