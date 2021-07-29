class CustomErrors {
    public readonly message: object | string;

    public readonly statusCode: number;

    constructor(message: object | string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export { CustomErrors };