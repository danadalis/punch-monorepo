export interface Logger {
    info(message: string): void;
    error(message: string, error?: any): void;  // The error parameter is optional.
}
