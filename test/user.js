const { UserService } = require('../service/user/UserService.js')

    (async () => {
        let user = new UserService()
        let userInfo = {
            rawData: JSON.stringify({
                nickName: '1234',
                country: 'sdfadf',
                city: 'sdfsdfsdfsdfsdfsd',
                avatarUrl: 'sdfadfad23423fwer23'
            })
        }
        user.save(userInfo)
    })