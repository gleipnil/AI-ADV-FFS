import type { GameState, GMResponse } from '../types';

export class MainScreen {
  private headerEl: HTMLElement;
  private mainContentEl: HTMLElement;
  private statusBarEl: HTMLElement;
  private inputAreaEl: HTMLElement;
  private inputCallback: ((input: string) => void) | null = null;

  constructor() {
    this.headerEl = document.getElementById('header')!;
    this.mainContentEl = document.getElementById('main-content')!;
    this.statusBarEl = document.getElementById('status-bar')!;
    this.inputAreaEl = document.getElementById('input-area')!;
  }

  render(): void {
    // Basic render - title screen will be shown separately
  }

  showTitleScreen(onStart: (playerName: string) => void): void {
    this.headerEl.innerHTML = '';
    this.mainContentEl.innerHTML = `
      <div class="menu-container">
        <div class="title-text">記憶のカケラを辿る</div>
        <div class="narrative-text text-center mb-20">バディ同行型・生成AI TRPG</div>
        <div class="menu-option">
          <div class="input-prompt">プレイヤー名:</div>
          <input type="text" id="player-name-input" placeholder="プレイヤー" maxlength="20" autocomplete="off" />
        </div>
        <div class="menu-option">
          <button class="crt-button" id="btn-new-game">新しい冒険を始める</button>
        </div>
        <div class="menu-option">
          <button class="crt-button" id="btn-load-game" disabled>セーブデータから再開</button>
        </div>
        <div class="menu-option">
          <button class="crt-button" id="btn-gallery" disabled>ギャラリー</button>
        </div>
      </div>
    `;
    this.statusBarEl.innerHTML = '';
    this.inputAreaEl.innerHTML = '';

    // Setup event listeners
    const nameInput = document.getElementById('player-name-input') as HTMLInputElement;
    nameInput.focus();

    const startGame = () => {
      const playerName = nameInput.value.trim() || 'プレイヤー';
      onStart(playerName);
    };

    document.getElementById('btn-new-game')!.addEventListener('click', startGame);
    nameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        startGame();
      }
    });
  }

  showLoading(message: string): void {
    this.mainContentEl.innerHTML = `
      <div class="loading-spinner">
        <p>${message}</p>
        <p>█████████████████████</p>
      </div>
    `;
  }

  showError(message: string): void {
    this.mainContentEl.innerHTML += `
      <div class="error-message">
        <p>⚠️ エラー: ${message}</p>
      </div>
    `;
  }

  renderGameScreen(gameState: GameState): void {
    // Header with current turn number
    this.headerEl.innerHTML = `
      <div class="narrative-text">
        SESSION ${gameState.sessionNumber.toString().padStart(2, '0')} - 
        TURN ${gameState.turnNumber.toString().padStart(2, '0')} - 
        ${gameState.currentWorld.name}
      </div>
    `;

    // Clear main content for game start
    this.mainContentEl.innerHTML = '<div class="section-header">【物語の始まり】</div>';

    // Status bar
    this.updateStatusBar(gameState);

    // Input area
    this.renderInputArea();
  }

  // オープニングシーンを表示（最初の入力前）
  showOpeningScene(sceneText: string): void {
    this.mainContentEl.innerHTML += `
      <div class="narrative-text">${this.escapeHtml(sceneText)}</div>
      <div class="divider"></div>
    `;
    this.mainContentEl.scrollTop = this.mainContentEl.scrollHeight;
  }

  updateStatusBar(gameState: GameState): void {
    const items = gameState.inventory.map(item =>
      `${item.name} x${item.quantity}`
    ).join(' | ');

    const fragments = `記憶: ${gameState.truthProgress.collectedFragments.length}`;

    const trustColor = this.getTrustColorClass(gameState.buddy.trustLevel);
    const buddyDisplay = `<span class="${trustColor}">${gameState.buddy.name}</span>`;

    this.statusBarEl.innerHTML = `
      <div>[アイテム] ${items || 'なし'} | [${fragments}] | [バディ] ${buddyDisplay}</div>
    `;
  }

  private getTrustColorClass(trustLevel: number): string {
    if (trustLevel >= 50) return 'buddy-name-high';
    if (trustLevel >= 0) return 'buddy-name-normal';
    if (trustLevel >= -50) return 'buddy-name-low';
    return 'buddy-name-danger';
  }

  appendGMResponse(response: GMResponse, gameState: GameState): void {
    // Update header with latest turn number
    this.headerEl.innerHTML = `
      <div class="narrative-text">
        SESSION ${gameState.sessionNumber.toString().padStart(2, '0')} - 
        TURN ${gameState.turnNumber.toString().padStart(2, '0')} - 
        ${gameState.currentWorld.name}
      </div>
    `;

    // Scene description
    if (response.sceneDescription) {
      this.mainContentEl.innerHTML += `
        <div class="section-header">【情景】</div>
        <div class="narrative-text">${this.escapeHtml(response.sceneDescription)}</div>
      `;
    }

    // Buddy dialogue
    if (response.buddyDialogue) {
      const trustColor = this.getTrustColorClass(gameState.buddy.trustLevel);
      this.mainContentEl.innerHTML += `
        <div class="section-header">【<span class="${trustColor}">${gameState.buddy.name}</span>】</div>
        <div class="buddy-dialogue">"${this.escapeHtml(response.buddyDialogue)}"</div>
      `;
    }

    // Hints
    if (response.hints && response.hints.length > 0) {
      this.mainContentEl.innerHTML += `
        <div class="section-header">【ヒント】</div>
        <div class="narrative-text">${response.hints.map(h => `・${this.escapeHtml(h)}`).join('<br>')}</div>
      `;
    }

    // Scroll to bottom
    this.mainContentEl.scrollTop = this.mainContentEl.scrollHeight;

    // Update status bar
    this.updateStatusBar(gameState);
  }

  renderInputArea(): void {
    this.inputAreaEl.innerHTML = `
      <div class="input-prompt">&gt; あなたの行動を入力してください:</div>
      <input type="text" id="player-input" placeholder="..." autocomplete="off" />
    `;

    const inputEl = document.getElementById('player-input') as HTMLInputElement;
    inputEl.focus();

    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && inputEl.value.trim() && this.inputCallback) {
        const input = inputEl.value.trim();
        inputEl.value = '';

        // Display player's action
        this.mainContentEl.innerHTML += `
          <div class="divider"></div>
          <div class="narrative-text">&gt; ${this.escapeHtml(input)}</div>
          <div class="divider"></div>
        `;
        this.mainContentEl.scrollTop = this.mainContentEl.scrollHeight;

        this.inputCallback(input);
      }
    });
  }

  onPlayerInput(callback: (input: string) => void): void {
    this.inputCallback = callback;
  }

  disableInput(): void {
    const inputEl = document.getElementById('player-input') as HTMLInputElement | null;
    if (inputEl) {
      inputEl.disabled = true;
      inputEl.placeholder = '処理中...';
    }
  }

  enableInput(): void {
    const inputEl = document.getElementById('player-input') as HTMLInputElement | null;
    if (inputEl) {
      inputEl.disabled = false;
      inputEl.placeholder = '...';
      inputEl.focus();
    }
  }

  showEndingScene(endingText: string, gameState: GameState): void {
    // Display ending narrative
    setTimeout(() => {
      this.mainContentEl.innerHTML += `
        <div class="divider"></div>
        <div class="section-header">【エンディング】</div>
        <div class="narrative-text">${this.escapeHtml(endingText)}</div>
        <div class="divider"></div>
      `;
      this.mainContentEl.scrollTop = this.mainContentEl.scrollHeight;
    }, 500);
  }

  showEndingScreen(endingType: 'perfect' | 'normal' | 'survival' | 'breakdown', onContinue: () => void): void {
    let message = '';
    switch (endingType) {
      case 'perfect':
        message = '【完全クリア！】<br>全ての目標を達成した！';
        break;
      case 'normal':
        message = '【クリア】<br>無事に帰還できた。';
        break;
      case 'survival':
        message = '【生還】<br>何とか生き延びた...<br>次こそは。';
        break;
      case 'breakdown':
        message = '【破局エンド】<br>バディがあなたの元を去っていった...<br><span class="error-message">このセーブデータは続行できません</span>';
        break;
    }

    this.mainContentEl.innerHTML += `
      <div class="divider"></div>
      <div class="section-header text-center mt-20">${message}</div>
      <div class="text-center mt-20">
        <button class="crt-button" id="btn-continue">タイトルへ戻る</button>
      </div>
    `;

    this.inputAreaEl.innerHTML = '';
    document.getElementById('btn-continue')!.addEventListener('click', onContinue);
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
