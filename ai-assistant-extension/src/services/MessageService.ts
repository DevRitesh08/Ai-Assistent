// Message Service for Extension Communication
export class MessageService {
  sendMessage(type: string, data?: any): Promise<any> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type, data }, (response) => {
        resolve(response);
      });
    });
  }

  sendToTab(tabId: number, type: string, data?: any): Promise<any> {
    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, { type, data }, (response) => {
        resolve(response);
      });
    });
  }

  onMessage(callback: (message: any, sender: chrome.runtime.MessageSender) => void) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      callback(message, sender);
      return true;
    });
  }
}

export default MessageService;