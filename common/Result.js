export class Result {
    constructor ({
        code = '0',
        data = [],
        errMSg = ''
    }) {
        this.code = code 
        this.data = data
        this.errMSg = errMSg
    } 
}