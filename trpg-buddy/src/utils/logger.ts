/**
 * Unified logging system for the application
 * Provides consistent logging with levels and module identification
 */

export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    NONE = 4
}

export class Logger {
    private static currentLevel: LogLevel = LogLevel.INFO;

    /**
     * Set the global log level
     * @param level Minimum level to log (DEBUG, INFO, WARN, ERROR, NONE)
     */
    static setLevel(level: LogLevel): void {
        this.currentLevel = level;
    }

    /**
     * Get current log level
     */
    static getLevel(): LogLevel {
        return this.currentLevel;
    }

    /**
     * Debug log - for detailed development information
     */
    static debug(module: string, message: string, data?: any): void {
        if (this.currentLevel <= LogLevel.DEBUG) {
            console.log(`[DEBUG][${module}] ${message}`, data !== undefined ? data : '');
        }
    }

    /**
     * Info log - for general informational messages
     */
    static info(module: string, message: string, data?: any): void {
        if (this.currentLevel <= LogLevel.INFO) {
            console.log(`[INFO][${module}] ${message}`, data !== undefined ? data : '');
        }
    }

    /**
     * Warning log - for potentially problematic situations
     */
    static warn(module: string, message: string, data?: any): void {
        if (this.currentLevel <= LogLevel.WARN) {
            console.warn(`[WARN][${module}] ${message}`, data !== undefined ? data : '');
        }
    }

    /**
     * Error log - for error conditions
     */
    static error(module: string, message: string, error?: any): void {
        if (this.currentLevel <= LogLevel.ERROR) {
            console.error(`[ERROR][${module}] ${message}`, error !== undefined ? error : '');
        }
    }
}

// Set log level based on environment
if (import.meta.env.PROD) {
    Logger.setLevel(LogLevel.WARN);
} else {
    Logger.setLevel(LogLevel.DEBUG);
}
