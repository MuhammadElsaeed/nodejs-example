export default class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.statusText = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}