import Vue from 'vue'
import app from './App.vue'
const root = document.createElement('div')

document.body.appendChild(root)

new Vue({
  comments: [
      app
  ],
  template: '<app></app>'
}).$mount(root)
