import './ui/retro-cui.css';
import './ui/retro-cui-toggle.css';
import './ui/roleplay-bonus.css';
import { GameEngine } from './game-engine';
import { Logger } from './utils/logger';

Logger.info('Main', '記憶のカケラを辿る - AI TRPG');
Logger.info('Main', 'Initializing game...');

// Check for API key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey || apiKey === 'your_api_key_here') {
  Logger.error('Main', 'Gemini API key not found!');
  Logger.info('Main', 'Please create a .env file and set VITE_GEMINI_API_KEY');
  document.getElementById('main-content')!.innerHTML = `
    <div class="error-message">
      <p>⚠️ API キーが設定されていません</p>
      <p>.env ファイルを作成し、VITE_GEMINI_API_KEY を設定してください</p>
      <p><code>VITE_GEMINI_API_KEY=your_actual_api_key</code></p>
    </div>
  `;
} else {
  Logger.info('Main', '✓ API key detected');

  // Initialize game engine
  const gameEngine = new GameEngine(apiKey);

  // Start game
  gameEngine.initialize();

  Logger.info('Main', 'Game engine initialized');
}
