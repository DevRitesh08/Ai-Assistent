// Background Service Worker (Manifest V3)
console.log('AI Assistant Background Service Worker Loaded');

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('AI Assistant installed!');
    // Set default settings
    chrome.storage.local.set({
      aiProvider: 'openai',
      avatarEnabled: true,
      avatarPosition: { x: 20, y: 20 },
    });
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);

  if (message.type === 'ANALYZE_PAGE') {
    handlePageAnalysis(message.data, sendResponse);
    return true; // Keep channel open for async response
  }

  if (message.type === 'AI_QUERY') {
    handleAIQuery(message.query, sendResponse);
    return true;
  }
});

async function handlePageAnalysis(data: any, sendResponse: (response: any) => void) {
  try {
    // TODO: Implement AI-powered page analysis
    const analysis = {
      title: data.title,
      summary: 'Analysis coming soon...',
      keyPoints: [],
    };
    sendResponse({ success: true, data: analysis });
  } catch (error: any) {
    sendResponse({ success: false, error: error.message });
  }
}

async function handleAIQuery(query: string, sendResponse: (response: any) => void) {
  try {
    // TODO: Integrate with LLM API
    const response = `You asked: "${query}". AI integration coming soon!`;
    sendResponse({ success: true, response });
  } catch (error: any) {
    sendResponse({ success: false, error: error.message });
  }
}