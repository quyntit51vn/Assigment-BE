export class AppError {
    protected statusCode: Number;

    protected message: String;

    protected name: String;

    constructor(message, statusCode = 500) {
        this.message = message;
        this.statusCode = statusCode;
    }

    logger() {
        // log error
    }

    sendMail() {
        // send email
    }

    executeAll() {
        this.logger();
        this.sendMail();
    }
}
