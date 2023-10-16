import { BadInputDefaults, NotFoundDefaults, ServerErrorDefaults, UnauthorizedDefaults } from './constants'

export abstract class Exception extends Error {
  private _systemErrorCode: string

  private _statusCode: number
  get statusCode(): number {
    return this._statusCode
  }

  constructor(message: string, systemErrorCode: string, statusCode: number = 500) {
    super()
    this._statusCode = statusCode
    this._systemErrorCode = systemErrorCode
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }

  toString(): string {
    return `Handled Exception: [${this._systemErrorCode} ${this._statusCode}] ${this.message}`
  }

  toJson(): string {
    return JSON.stringify({
      message: this.message,
      systemErrorCode: this._systemErrorCode,
      statusCode: this._statusCode,
      stack: this.stack,
    })
  }
}

export class ServerException extends Exception {
  constructor(message: string) {
    super(message, ServerErrorDefaults.systemErrorCode, ServerErrorDefaults.statusCode)
    this.name = ServerErrorDefaults.name
  }
}

export class BadInput extends Exception {
  constructor(message: string) {
    super(message, BadInputDefaults.systemErrorCode, BadInputDefaults.statusCode)
    this.name = BadInputDefaults.name
  }
}

export class NotFound extends Exception {
  constructor(message: string) {
    super(message, NotFoundDefaults.systemErrorCode, NotFoundDefaults.statusCode)
    this.name = NotFoundDefaults.name
  }
}

export class Unauthorized extends Exception {
  constructor(message: string) {
    super(message, UnauthorizedDefaults.systemErrorCode, UnauthorizedDefaults.statusCode)
    this.name = UnauthorizedDefaults.name
  }
}
