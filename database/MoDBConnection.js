const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/fashion'
mongoose.Promise = global.Promise 

export const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug',true)
    }
    return new Promise((resolve,rej) => {
        let maxConnectTime = 0
        mongoose.connect(db)
        mongoose.connection.on('disconnected', () => {
            console.log(maxConnectTime)
            maxConnectTime++
            if(maxConnectTime < 5){
                mongoose.connect(db)
            }else{
                throw new Error('mongodb is failed')
            }  
        })
        mongoose.connection.on('error', e => {
            console.log(e)
        })
        mongoose.connection.once('open', () => {
            console.log('mongodb is connected successful')
            resolve()
        })
    })
    
}