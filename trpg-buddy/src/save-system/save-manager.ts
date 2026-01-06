// Stub implementations for core systems
// These will be fully implemented in subsequent phases

import type { GameState, SaveData, GalleryData } from '../types';

export class SaveManager {
    private readonly SAVE_KEY_PREFIX = 'trpg_buddy_save_';
    private readonly GALLERY_KEY = 'trpg_buddy_gallery';

    saveGame(slot: number, state: GameState, isBreakdown: boolean = false): void {
        const saveData: SaveData = {
            slot,
            timestamp: Date.now(),
            gameState: state,
            isBreakdown
        };

        const key = `${this.SAVE_KEY_PREFIX}${slot}`;
        localStorage.setItem(key, JSON.stringify(saveData));
        console.log(`SaveManager: Game saved to slot ${slot}`);
    }

    loadGame(slot: number): GameState | null {
        const key = `${this.SAVE_KEY_PREFIX}${slot}`;
        const data = localStorage.getItem(key);

        if (!data) {
            console.log(`SaveManager: No save data found in slot ${slot}`);
            return null;
        }

        try {
            const saveData: SaveData = JSON.parse(data);
            if (saveData.isBreakdown) {
                console.log(`SaveManager: Slot ${slot} is marked as breakdown`);
                return null;
            }

            console.log(`SaveManager: Game loaded from slot ${slot}`);
            return saveData.gameState;
        } catch (error) {
            console.error(`SaveManager: Failed to load slot ${slot}:`, error);
            return null;
        }
    }

    getGalleryData(): GalleryData {
        const data = localStorage.getItem(this.GALLERY_KEY);
        if (!data) {
            return {
                collectedFragments: [],
                reachedEndings: [],
                totalSessions: 0
            };
        }

        try {
            return JSON.parse(data);
        } catch (error) {
            console.error('SaveManager: Failed to load gallery data:', error);
            return {
                collectedFragments: [],
                reachedEndings: [],
                totalSessions: 0
            };
        }
    }

    updateGalleryData(data: Partial<GalleryData>): void {
        const current = this.getGalleryData();
        const updated = { ...current, ...data };
        localStorage.setItem(this.GALLERY_KEY, JSON.stringify(updated));
        console.log('SaveManager: Gallery data updated');
    }
}
