export class Result {
    constructor ({
        code = '0',
        data = [],
        errMsg = ''
    }) {
        this.code = code 
        this.data = data
        this.errMsg = errMsg
    } 
}