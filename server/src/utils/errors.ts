export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(code: string, message: string, statusCode: number) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;

    // Conserve une stack trace propre (sans inclure le constructeur)
    Error.captureStackTrace(this, this.constructor);
  }
}
