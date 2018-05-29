export class Result {
    constructor ({
        code,
        data
    }) {
        this.code = code || 200
        this.data = data
    } 
}