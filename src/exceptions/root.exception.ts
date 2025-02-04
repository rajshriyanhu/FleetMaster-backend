export class HttpException extends Error {
    message : string;
    errorCode : ErrorCode;
    statusCode : number;
    errors : any;

    constructor(message : string, errorCode : ErrorCode, statusCode : number, error : any){
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
        Error.captureStackTrace(this, this.constructor);
    }
}

export enum ErrorCode {
    NOT_FOUND = 1001,
    ALREADY_EXISTS = 1002,
    WRONG_CREDENTIALS = 1003,
    INTERNAL_EXCEPTION = 3001,
    UNAUTHORIZED = 3002,
}