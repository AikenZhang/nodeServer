const { Result } = require('./Result.js')

export const Interception = () => async (cxt,next) => {
    //登录拦截 查看是否带有token
    const token = ctx.request.header.author-token
    console.log(token)
    cxt.body = new Result({
        code:111
    })
}