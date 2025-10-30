// AI Service for LLM Integration
export class AIService {
  private apiKey: string | null = null;
  private provider: string = 'openai';

  constructor() {
    this.loadConfig();
  }

  private async loadConfig() {
    const config = await chrome.storage.local.get(['aiProvider', 'apiKey']);
    this.provider = config.aiProvider || 'openai';
    this.apiKey = config.apiKey || null;
  }

  async sendMessage(prompt: string): Promise<string> {
    // TODO: Implement actual API calls to OpenAI/Gemini/etc
    console.log('AI Query:', prompt);
    return `AI response to: "${prompt}" (Integration coming soon!)`;
  }

  async analyzeWebpage(_content: string): Promise<any> {
    // TODO: Implement webpage analysis
    console.log('Analyzing webpage content...');
    return {
      summary: 'Analysis coming soon',
      keywords: [],
      sentiment: 'neutral',
    };
  }
}

export default AIService;