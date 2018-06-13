const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const { appConfig } = require('../appConfig.js')
const db = appConfig.mongo
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
export const initSchemas = () => {
    glob.sync(resolve(__dirname,'../model/*.js')).forEach(require)
}