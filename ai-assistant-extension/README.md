# AI Assistant Extension

## Overview
The AI Assistant Extension is a browser extension designed to enhance user experience by providing AI-driven functionalities. It interacts with web pages, allowing users to leverage AI capabilities seamlessly.

## Project Structure
The project is organized into several directories and files:

- **src/**: Contains the source code for the extension.
  - **background/**: Background script managing events and interactions with the browser.
    - `background.ts`
  - **content/**: Content script that interacts with web pages.
    - `content.ts`: Manipulates the DOM and communicates with the background script.
    - `content.css`: Styles for the content script.
  - **popup/**: Popup interface for the extension.
    - `popup.html`: HTML structure for the popup.
    - `popup.ts`: Logic for handling user interactions in the popup.
    - `popup.css`: Styles for the popup interface.
  - **avatar/**: Handles avatar rendering and expressions.
    - `AvatarRenderer.ts`: Class for rendering avatars.
    - `AvatarExpressions.ts`: Class for managing avatar expressions.
    - `avatar.css`: Styles for avatar rendering.
  - **services/**: Contains service classes for various functionalities.
    - `AIService.ts`: Interacts with AI functionalities.
    - `StorageService.ts`: Manages data storage and retrieval.
    - `MessageService.ts`: Handles messaging between different parts of the extension.
  - **types/**: Contains TypeScript types and interfaces.
    - `index.ts`
  - **utils/**: Utility functions for various tasks.
    - `dom.ts`: DOM manipulation utilities.
    - `logger.ts`: Logging utilities.

- **public/**: Contains public assets.
  - **icons/**: Icon images for the extension in different sizes.
  - **models/**: Directory for model files used by the extension.

- **manifest.json**: Configuration file for the extension, defining permissions and settings.

- **package.json**: npm configuration file listing dependencies and scripts.

- **tsconfig.json**: TypeScript configuration file specifying compiler options.

- **webpack.config.js**: Webpack configuration for bundling project files.

- **.gitignore**: Specifies files and directories to be ignored by Git.

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd ai-assistant-extension
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
To use the AI Assistant Extension, load it as an unpacked extension in your browser's extension settings. Follow the instructions provided in the browser's documentation for loading unpacked extensions.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.