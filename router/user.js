const express=require('express')
const router = express.Router()


const ctrl=require('../controller/user.js')

router.get('/register',ctrl.handleRegisterget)

router.get('/login',ctrl.handleLoginget)

//用户注册业务逻辑
router.post('/register',ctrl.handleRegisterPost)

//登录业务逻辑
router.post('/login',ctrl.handleLoginPost)

//注销业务逻辑
router.get('/logout',ctrl.handleLogoutGet)

module.exports = router