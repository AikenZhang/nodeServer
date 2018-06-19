const token = {
   getToken () {
     return localStorage.getItem('fy_token')
   },
   deleteToken () {
     localStorage.removeItem('fy_token')
   },
   setToken (tokens) {
     localStorage.setItem('fy_token',tokens)
   }
}
module.exports = {
  token
}