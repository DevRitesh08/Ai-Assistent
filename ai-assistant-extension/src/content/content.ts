// Content Script - Injected into every webpage
import { AvatarRenderer } from '../avatar/AvatarRenderer';

console.log('🤖 AI Assistant Content Script Loaded');

class ContentManager {
  private avatarRenderer: AvatarRenderer | null = null;
  private isAvatarVisible: boolean = false;

  constructor() {
    this.init();
  }

  private async init() {
    console.log('🎯 Initializing Content Manager...');
    
    // Wait for page to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeAvatar());
    } else {
      this.initializeAvatar();
    }

    // Listen for messages from background or popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sendResponse);
      return true;
    });
  }

  private initializeAvatar() {
    try {
      console.log('🎭 Creating avatar renderer...');
      this.avatarRenderer = new AvatarRenderer();
      this.avatarRenderer.inject();
      this.isAvatarVisible = true;
      console.log('✅ 3D Avatar initialized successfully!');
    } catch (error) {
      console.error('❌ Failed to initialize avatar:', error);
    }
  }

  private handleMessage(message: any, sendResponse: (response: any) => void) {
    console.log('📨 Content script received message:', message);
    
    switch (message.type) {
      case 'TOGGLE_AVATAR': {
        this.toggleAvatar();
        sendResponse({ success: true, visible: this.isAvatarVisible });
        break;
      }

      case 'UPDATE_EXPRESSION': {
        if (this.avatarRenderer) {
          this.avatarRenderer.setExpression(message.expression);
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false, error: 'Avatar not initialized' });
        }
        break;
      }

      case 'EXTRACT_PAGE_CONTENT': {
        const content = this.extractPageContent();
        sendResponse({ success: true, content });
        break;
      }

      default:
        sendResponse({ success: false, error: 'Unknown message type' });
    }
  }

  private toggleAvatar() {
    if (this.avatarRenderer) {
      if (this.isAvatarVisible) {
        this.avatarRenderer.hide();
        console.log('🙈 Avatar hidden');
      } else {
        this.avatarRenderer.show();
        console.log('👁️ Avatar shown');
      }
      this.isAvatarVisible = !this.isAvatarVisible;
    }
  }

  private extractPageContent() {
    return {
      title: document.title,
      url: window.location.href,
      text: document.body.innerText.substring(0, 5000),
      links: Array.from(document.querySelectorAll('a')).map(a => a.href).slice(0, 50),
      images: Array.from(document.querySelectorAll('img')).map(img => img.src).slice(0, 20),
    };
  }
}

// Initialize content manager
new ContentManager();