export class Result {
    constructor ({
        success,
        code,
        data
    }) {
        this.success = success || true
        this.code = code || 200
        this.data = data
    } 
}