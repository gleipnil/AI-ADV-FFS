import './ui/retro-cui.css';
import './ui/retro-cui-toggle.css';
import { GameEngine } from './game-engine';

console.log('記憶のカケラを辿る - AI TRPG');
console.log('Initializing game...');

// Check for API key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey || apiKey === 'your_api_key_here') {
  console.error('⚠️ Gemini API key not found!');
  console.log('Please create a .env file and set VITE_GEMINI_API_KEY');
  document.getElementById('main-content')!.innerHTML = `
    <div class="error-message">
      <p>⚠️ API キーが設定されていません</p>
      <p>.env ファイルを作成し、VITE_GEMINI_API_KEY を設定してください</p>
      <p><code>VITE_GEMINI_API_KEY=your_actual_api_key</code></p>
    </div>
  `;
} else {
  console.log('✓ API key detected');

  // Initialize game engine
  const gameEngine = new GameEngine(apiKey);

  // Start game
  gameEngine.initialize();

  console.log('Game engine initialized');
}
