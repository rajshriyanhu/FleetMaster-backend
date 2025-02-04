import { ErrorCode, HttpException } from "./root.exception";

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors? : any) {
        super(message, errorCode, 401, errors);
    }
}